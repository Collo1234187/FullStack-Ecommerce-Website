
import './App.css';
import {Navbar}   from './Components/Navbar/Navbar';
import {Routes,Route, useLocation} from 'react-router-dom';

import {Shop} from './Pages/Shop';
import {ShopCategory} from './Pages/ShopCategory';
import {Cart} from './Pages/Cart';
import { Search } from './Pages/Search';
import {Product} from './Pages/Product';
import {LoginSignup} from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import bed_banner from './Components/Assets/bed_banner.jpg'
import pillow_banner from './Components/Assets/pillows_banner.jpg'
import stand_banner from './Components/Assets/stand_banner.jpg'
import chair_banner from './Components/Assets/chair_banner.jpg'
import sofa_banner from './Components/Assets/sofa_banner.jpg'
import table_banner from './Components/Assets/table_banner.jpg'
import dining_banner from './Components/Assets/dining_banner.jpg'
import mattress_banner from './Components/Assets/mattress_banner.jpg'
import PlaceOrder from './Pages/PlaceOrder'
import { ResendVerification } from './Pages/Resend-verification';
import { Verify } from './Pages/Verify';
import { WoodFlooring } from "./Components/Services/WoodFlooring";
import { OfficePartitioning } from "./Components/Services/OfficePartitioning";
import { FrameAndDoorInstallation } from "./Components/Services/FrameAndDoorInstallation";
import { CabinetInstallation } from "./Components/Services/CabinetInstallation";
import { WallPainting } from "./Components/Services/WallPainting";
import WhatsApp from './Components/WhatsApp/WhatsApp';
import VerifyPayment from './Pages/VerifyPayment';
import MyOrders from './Pages/MyOrders';
import BuyNowCheckout from './Pages/BuyNowCheckout';


function App() {
  const location = useLocation();

  const hideFooterOnPages = ['/Order','/buyNow'];

  return (
    <div >
      
      
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/bed' element={<ShopCategory banner={bed_banner} category="bed"/>}/>
        <Route path='/sofa' element={<ShopCategory banner={sofa_banner} category="sofa"/>}/>
        <Route path='/stand' element={<ShopCategory banner={stand_banner} category="stand"/>}/>
        <Route path='/dining' element={<ShopCategory banner={dining_banner}category="dining"/>}/>
        <Route path='/table' element={<ShopCategory banner={table_banner} category="table"/>}/>
        <Route path='/chair' element={<ShopCategory banner={chair_banner} category="chair"/>}/>
        <Route path='/mattress' element={<ShopCategory banner={mattress_banner} category="mattress"/>}/>
        <Route path='/pillow' element={<ShopCategory banner={pillow_banner} category="pillow"/>}/>
        <Route path="/product/:productId" element={<Product />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/Order' element={<PlaceOrder/>}/>
        <Route path='/resend-verification' element={<ResendVerification/>}/>
        <Route path='/Verify-email' element={<Verify/>}/>
        <Route path="/wood-flooring" element={<WoodFlooring />} />
        <Route path="/office-partitioning" element={<OfficePartitioning />} />
        <Route path="/installation-of-frame-and-doors" element={<FrameAndDoorInstallation />} />
        <Route path="/installation-of-cabinets" element={<CabinetInstallation />} />
        <Route path="/wall-painting" element={<WallPainting />} />
        <Route path="/verifyPay/:orderId" element={<VerifyPayment />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/buyNow" element={<BuyNowCheckout />} />

       
      </Routes>
      <WhatsApp/>
      {!hideFooterOnPages.includes(location.pathname) && <Footer />}
      
    </div>
  );
}

export default App;
