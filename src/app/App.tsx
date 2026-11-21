import React, { useState } from "react";

import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
//@ts-ignore
import "../css/app.css";
//@ts-ignore
import "../css/navbar.css";
//@ts-ignore
import "../css/footer.css";
import HelpPage from "./screens/helpPage";
import Footer from "./components/footers";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./auth";
function App() {
  const location = useLocation();
  const { onAdd, cartItems, onDelete, onDeleteAll, onRemove } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  // HANDLERS

  const handleSignupClose = () => {
    setSignupOpen(false);
  };
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          onRemove={onRemove}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          onRemove={onRemove}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}

export default App;
