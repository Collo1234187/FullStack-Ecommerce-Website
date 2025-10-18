import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_icon.svg';


const AddProduct = ({url}) => {
  const [image, setImage] = useState(null);       // File object
  const [preview, setPreview] = useState(null);   // Preview URL

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    description:"",
    category: "bed",
    new_price: "",
    old_price: ""
  });

  // 🖼 Handle file input + preview
  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview); // cleanup old preview
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    try {
      let product = { ...productDetails };
      let formData = new FormData();
      formData.append('product', image);

      // Upload image
      const uploadResp = await fetch(`${url}/upload`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const uploadData = await uploadResp.json();
      if (uploadData.success) {
        product.image = uploadData.image_url;

        // Save product
        const productResp = await fetch(`${url}/addproduct`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const productData = await productResp.json();
        productData.success
          ? alert("✅ Product Added Successfully")
          : alert("❌ Failed to Add Product");
      } else {
        alert("❌ Image upload failed");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("⚠️ Something went wrong. Check console.");
    }
  };

  //Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);






  return (
    <div className="add-Product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
        
      </div>

      <div className="add-product-description flex-col">
        <p>Product description</p>
        <textarea  onChange={changeHandler} value={productDetails.description} name="description" rows="6" placeholder="write content here" required></textarea>
        
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="Enter price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="Enter offer price"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="bed">Bed</option>
          <option value="sofa">Sofa</option>
          <option value="chair">Chair</option>
          <option value="dining">Dining</option>
          <option value="mattress">Mattress</option>
          <option value="table">Table</option>
          <option value="pillow">Pillow</option>
          <option value="stand">Stand</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={preview || upload_area}
            alt="preview"
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={Add_Product} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
