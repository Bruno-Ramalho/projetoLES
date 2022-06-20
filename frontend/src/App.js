import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserManagerScreen from './screens/UserManagerScreen';
import SavedAddressScreen from './screens/SavedAddressScreen';
import SavedCardsScreen from './screens/SavedCardsScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import ManageOrderScreen from './screens/ManageOrderScreen';
import DetailsAddressScreen from './screens/DetailsAddressScreen';
import DetailsPayCardScreen from './screens/DetailsPayCardSreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import UserPasswordScreen from './screens/UserPasswordScreen';
import UserAddressScreen from './screens/UserAddressScreen';
import AddressManageScreen from './screens/AddressManageScreen';
import UserPayCardScreen from './screens/UserPayCardScreen';
import AdminManagerScreen from './screens/AdminManagerScreen';
import AdminManageOrderScreen from './screens/AdminManageOrderScreen';
import AdminManageUserScreen from './screens/AdminManageUserScreen';
import UserCuponsScreen from './screens/UserCuponsScreen';
import SavedCupomScreen from './screens/SavedCupomScreen';
import AdminChartScreen from './screens/AdminChartScreen';

function App() {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">
                            Xing-Ling
                        </Link>
                    </div>
                    <div>
                        <Link to="/cart">
                            Carrrinho
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )}
                        </Link>
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {userInfo.name} <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="#signout" onClick={signoutHandler}>
                                            Sair
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/usuarios">
                                            Minha Conta
                                        </Link>
                                    </li>
                                    {
                                        userInfo.admin ? (
                                            <li>
                                                <Link to="/admin">
                                                    Admin
                                                </Link>
                                            </li>
                                        ) : (
                                            <></>
                                        )
                                    }

                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Login</Link>
                        )}
                    </div>
                </header>
                <main>
                    <Route path="/order/:id" component={OrderDetailScreen}></Route>
                    <Route path="/orders" component={ManageOrderScreen}></Route>
                    <Route path="/savedCards" component={SavedCardsScreen}></Route>
                    <Route path="/savedCupoms" component={SavedCupomScreen}></Route>
                    <Route path="/savedAddress" component={SavedAddressScreen}></Route>
                    <Route path="/address/set/:id" component={DetailsAddressScreen}></Route>
                    <Route path="/user/cupom" component={UserCuponsScreen}></Route>
                    <Route path="/user/address/" component={UserAddressScreen}></Route>
                    <Route path="/user/paycard/" component={UserPayCardScreen}></Route>
                    <Route path="/user/change/address/:id" component={AddressManageScreen}></Route>
                    <Route path="/user/details" component={UserDetailsScreen} exact></Route>
                    <Route path="/user/password" component={UserPasswordScreen} exact></Route>
                    <Route path="/usuarios" component={UserManagerScreen} exact></Route>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen}></Route>
                    <Route path="/signin" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/shipping" component={ShippingAddressScreen}></Route>
                    <Route path="/payment" component={PaymentMethodScreen}></Route>
                    <Route path="/payCard/set/:id" component={DetailsPayCardScreen}></Route>
                    <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                    <Route path="/admin" component={AdminManagerScreen}></Route>
                    <Route path="/manage/users" component={AdminManageUserScreen}></Route>
                    <Route path="/adm/orders" component={AdminManageOrderScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                    <Route path="/Adminchart" component={AdminChartScreen} exact></Route>
                </main>
                <footer className="row center">Cria Software<span>&reg;</span></footer>
            </div>
        </BrowserRouter>
    );
}

export default App;