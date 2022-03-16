import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import SellerSettings from './pages/SellerSettings';
import BuyerSettings from './pages/BuyersSettings'; 
import SetWorkSchedule from './components/ScheduleCalendar/CalenderComponents'; 
import TOS from './components/TOS';
import Feed from './pages/Feed'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import ReceiptInfo from './pages/ReceiptInfo';
import Summary from './pages/Summary';
import Checkout from './pages/Checkout';
import FinalInvoice from './pages/FinalInvoice';
import Product from './pages/Product';
import Baker from './components/About/Baker';
import Chuson from './components/About/Chuson';
import Eusebio from './components/About/Eusebio';
import Walker from './components/About/Walker';
import Echevarria from './components/About/RowenaEchevarria';
import Krina from './components/About/Krina';
import Schroeder from './components/About/Schroeder';
import {Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/profile" component={Profile} />
        <Route path="/seller-settings" component={SellerSettings} />
        <Route path="/buyer-settings" component={BuyerSettings} />
        <Route path="/set-workSchedule" component={SetWorkSchedule} />
        <Route path="/TOS" component={TOS}/>
        <Route path="/feed" component={Feed} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/receipt-info" component={ReceiptInfo} />
        <Route path="/summary" component={Summary} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/final-invoice" component={FinalInvoice} />
        <Route path="/product/:id?" component={Product}/>
        <Route path="/mbaker" component={Baker} />
        <Route path="/kenneth" component={Chuson} />
        <Route path="/ceusebio" component={Eusebio} />
        <Route path="/walker" component={Walker} />
        <Route path="/rechevarria" component={Echevarria} />
        <Route path="/krinap" component={Krina} />
        <Route path="/michael" component={Schroeder} />
      </Switch>
    </main>
  );
}

export default App;
