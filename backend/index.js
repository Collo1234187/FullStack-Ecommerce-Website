require("dotenv").config();
const mpesaRoutes = require("./mpesa/MpesaRoutes.js");
const port =  process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const validator = require("validator");
const dns = require("dns");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


app.use(cors());
app.use(express.json());
app.use("/api/mpesa", mpesaRoutes);


// Frontend URL from env
const FRONTEND_URL = process.env.FRONTEND_URL || "https://fullstack-ecommerce-website-w98p.onrender.com/orderlist";
const BASE_URL = process.env.BASE_URL || "https://fullstack-ecommerce-website-1-8it1.onrender.com";

// ===================== MIDDLEWARE =====================
// Use JSON for all routes EXCEPT /webhook
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // skip JSON parsing
  } else {
    express.json()(req, res, next);
  }
});




// ======================= MONGODB CONNECTION =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ======================= API CHECK =======================
app.get("/", (req, res) => res.send("Express App is Running"));

// ======================= IMAGE STORAGE =======================
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage: storage });
 // Serve uploaded images 
app.use("/images", express.static("upload/images"));


// ======================= Upload Endpoint =======================
app.post("/upload", upload.single('product'), (req, res) => { 
  res.json({ success: 1, 
    filename: req.file.filename, 
    image_url: `${BASE_URL}/images/${req.file.filename}`, 
  }); 
});

// ======================= PRODUCT MODEL =======================
const Product =
  mongoose.models.Product ||
  mongoose.model(
    "Product",
    new mongoose.Schema({
      name: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      new_price: { type: Number, required: true },
      old_price: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      available: { type: Boolean, default: true },
    })
  );

// ======================= USER MODEL =======================
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  verificationTokenExpires: Date,
  date: { type: Date, default: Date.now },
});
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

// ======================= AUTH MIDDLEWARE =======================
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }
};

//=======================order model =====================
const orderSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  items:{type:Array,required:true},
  amount:{type:Number,required:true},
  address:{type:Object,required:true},
  status:{type:String,default:"order processing"},
  date:{type:Date,default:Date.now()},
  payment:{type:Boolean,default:false},
  mpesaCheckoutRequestId: { type: String },
});
const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);

// ======================= HELPERS =======================
function checkEmailDomain(email) {
  return new Promise((resolve) => {
    try {
      const domain = email.split("@")[1];
      if (!domain) return resolve(false);
      dns.resolveMx(domain, (err, addresses) => {
        if (err || !addresses || addresses.length === 0) {
          return resolve(false);
        }
        return resolve(true);
      });
    } catch (e) {
      return resolve(false);
    }
  });
}

async function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ======================= PRODUCT CRUD =======================
app.post("/addproduct", async (req, res) => { 
  try { 
    const product = new Product({ 
      name: req.body.name, 
      image: req.body.image, 
      description:req.body.description, 
      category: req.body.category, 
      new_price: Number(req.body.new_price), 
      old_price: Number(req.body.old_price), 
    }); 
    await product.save(); 
    res.json({ success: true, product }); 
  } 
  catch (err) { console.error("Error in /addproduct:", err.message); 
    res.status(500).json({ success: false, message: err.message }); 
  } });

app.post("/removeproduct", async (req, res) => {
  try {
    const { id } = req.body;
//FIND PRODUCT
    const product = await Product.findById(id);
    if (!product) 
      return res.status(404).json({ success: false, message: "Product not found" });
// extract filename from URL
    const filename = path.basename(product.image);
    const imagePath = path.join(__dirname, "upload", "images", filename);
// delete image file if it exists
    if (fs.existsSync(imagePath)){
      fs.unlinkSync(imagePath); 
      console.log(`Deleted image: ${imagePath}`); 
    } else { 
      console.warn(`Image not found on disk: ${imagePath}`); 
    }  
// delete product from DB
    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// ======================= SIGNUP + EMAIL VERIFICATION =======================
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ success: false, errors: "All fields required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, errors: "Please enter valid email" });

    if (await Users.findOne({ email }))
      return res.status(400).json({ success: false, errors: "Email already registered" });

    if (!(await checkEmailDomain(email)))
      return res.status(400).json({ success: false, errors: "Invalid email" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const products = await Product.find({});
    const cart = {};
    products.forEach((p) => (cart[p._id] = 0));
    

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const user = new Users({ name: username, email, password: hashedPassword, cartData: cart, verificationToken,verified: false,});
    user.verificationTokenExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const verifyURL = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
    const transporter = await getTransporter();

    if (transporter) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: "Verify your account",
        html: `<p>Hi ${username},</p><p>Click <a href="${verifyURL}">here</a> to verify your email.</p>`,
      });
    } else {
     
    }

    res.json({ success: true, message: "Signup successful. Check your email to verify." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ======================= EMAIL VERIFICATION =======================

app.post("/verify-email-token", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, message: "Token required" });

    const user = await Users.findOne({ verificationToken: token,verificationTokenExpires: { $gt: Date.now() }, });
    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

    user.verified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

   const data = { user: { id: user.id } };
    const jwtToken = jwt.sign(data, process.env.JWT_SECRET,{ expiresIn: "7d" });

    res.json({
      success: true,
      message: "Email verified successfully!",
      token: jwtToken,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ======================= RESEND VERIFICATION =======================
app.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    if (user.verified) {
      return res.status(400).json({ success: false, message: "Already verified" });
    }

    // Generate a fresh token
    const newToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = newToken;
    await user.save();

    
    const verifyURL = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${newToken}`;


    const transporter = await getTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: "Resend Email Verification",
        html: `<p>Hi ${user.name},</p>
               <p>Please verify your account by clicking 
               <a href="${verifyURL}">this link</a>.</p>`,
      });
    } else {
      console.log("No SMTP configured. Use this link to verify:", verifyURL);
    }

    res.json({ success: true, message: "Verification email resent!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

    
// ======================= LOGIN =======================
app.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ success: false, errors: "Wrong Email Id" });
    }

    // If user exists but not verified → return resend option
    if (!user.verified) {
      return res.status(401).json({
        success: false,
        errors: "Please verify your email before logging in.",
        resendOption: true,
        email: user.email, // send back email for resend
      });
    }

    // Check password
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passCompare) {
      return res.json({ success: false, errors: "Wrong Password" });
    }

    // Generate JWT if all good
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
});


// ======================= COLLECTIONS =======================

// New Collection
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
});

// Also Like Collection
app.get("/alsolikecollection", async (req, res) => {
  try {
    const categories = ["bed", "stand", "chair", "pillow", "dining", "sofa"];
    const perCategory = 2;
    const totalLimit = 12;
    let allResults = [];

    for (const cat of categories) {
      const count = await Product.countDocuments({ category: cat });
      const products = await Product.aggregate([
        { $match: { category: cat } },
        { $sample: { size: Math.min(count, perCategory) } },
      ]);
      allResults = allResults.concat(products);
    }

    // Shuffle
    for (let i = allResults.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allResults[i], allResults[j]] = [allResults[j], allResults[i]];
    }

    allResults = allResults.slice(0, totalLimit);
    res.send(allResults);
  } catch (error) {
    console.error("Error fetching Also-like collection:", error);
    res.status(500).send({ error: "Failed to fetch Also-like collection" });
  }
});



// ======================= CART ROUTES =======================

// Add to Cart
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const qty = quantity && quantity > 0 ? quantity : 1;

    let userData = await Users.findById(req.user.id);
    if (!userData) return res.status(404).send("User not found");

    if (!userData.cartData) {
      userData.cartData = {};
    }

    userData.cartData[itemId] = (userData.cartData[itemId] || 0) + qty;
    await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

    res.json({ success: true, cartData: userData.cartData });
  } catch (err) {
    console.error("Error in addtocart:", err.message);
    res.status(500).send("Server error");
  }
});

// Remove from Cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const qty = quantity && quantity > 0 ? quantity : 1;

    let userData = await Users.findById(req.user.id);
    if (!userData) return res.status(404).send("User not found");

    if (!userData.cartData) {
      userData.cartData = {};
    }

    if (userData.cartData[itemId]) {
      userData.cartData[itemId] = Math.max(
        userData.cartData[itemId] - qty,
        0
      );
    }

    await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

    res.json({ success: true, cartData: userData.cartData });
  } catch (err) {
    console.error("Error in removefromcart:", err.message);
    res.status(500).send("Server error");
  }
});

// Get Cart
app.post("/getcart", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findById(req.user.id);
    if (!userData) return res.status(404).send("User not found");

    res.json(userData.cartData);
  } catch (err) {
    console.error("Error in getcart:", err.message);
    res.status(500).send("Server error");
  }
});

// ======================= RELATED PRODUCTS =======================
app.get("/relatedproducts/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const currentProduct = await Product.findById(productId);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const related = await Product.find({
      category: currentProduct.category,
      _id: { $ne: productId },
    }).limit(4);

    res.json(related);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//========================placing order from frontend ==========
app.post("/place", fetchUser, async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // Clear user's cart
    await Users.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare line_items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "kes",
        product_data: { name: item.name },
        unit_amount: item.new_price  *100, // Stripe expects smallest unit
      },
      quantity: item.quantity,
    }));

    // Add delivery fee
    line_items.push({
      price_data: {
        currency: "kes",
        product_data: { name: "Delivery Charges" },
        unit_amount: 300 * 100 ,
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items,
  mode: "payment",
  customer_email: address.email,
  success_url: `${FRONTEND_URL}/verifypay/${newOrder._id}?success=true&orderId=${newOrder._id}`,
  cancel_url: `${FRONTEND_URL}/verifypay/${newOrder._id}?success=false&orderId=${newOrder._id}`,
  metadata: {orderId: newOrder._id.toString(),},// so webhook can also use it
     
  
});

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error in /place:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
//========================webhook to confirm payment====================

// Only parse raw body for webhook
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata.orderId;
      try {
        await orderModel.findByIdAndUpdate(orderId, {
          payment: true,
          status: "order processing",
        });
        console.log("Payment confirmed for order:", orderId);
      } catch (err) {
        console.error("Error updating order payment:", err);
      }
    }

    res.json({ received: true });
  }
);

//========================frontend to confirm payment ================
app.get("/verifypay/:orderId", fetchUser, async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.orderId);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    res.json({
      success: true,
      paid: order.payment,
      status: order.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//=======================user orders=====================
app.post("/userorders",fetchUser, async (req, res) => {
   try {
     const orders = await orderModel.find({userId:req.user.id});
     res.json({success: true,data:orders})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
   }
});

//======================admin listing orders =================
 app.get('/list', async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
 })

 //=====================updating order status =================
 app.post('/status',async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"status updated"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
 })

// ======================= START SERVER =======================
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
