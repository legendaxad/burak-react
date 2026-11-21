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
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./service/MeberService";
import { useGlobals } from "./hooks/useGlobal";
function App() {
  const { setAuthMember } = useGlobals();
  const location = useLocation();
  const { onAdd, cartItems, onDelete, onDeleteAll, onRemove } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for managing the anchor element of the menu
  // HANDLERS
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget); // Set the anchor element to the clicked button
  }; // Handler function to handle the click event for the logout button. It sets the anchor element to the clicked button, which will be used to position the menu.
  const handleCloseLogout = () => setAnchorEl(null); // Close the menu by setting the anchor element to null
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("Logout successful", 700);
      setAuthMember(null); // Clear the authMember state after logout
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  }; // Handler function to handle the logout request. It calls the logout method from the MemberService, shows a success alert, and clears the authMember state. If an error occurs, it logs the error and shows an error alert.
  const handleSignupClose = () => {
    setSignupOpen(false);
  }; // Handler function to close the signup modal by setting the signupOpen state to false
  const handleLoginClose = () => {
    setLoginOpen(false);
  }; // Handler function to close the login modal by setting the loginOpen state to false

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
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
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
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
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
