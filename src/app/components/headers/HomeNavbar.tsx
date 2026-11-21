import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";
interface HomeNavbarProps {
  cartItems: CartItem[];
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onRemove: (item: CartItem) => void;
  onAdd: (item: CartItem) => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
}
export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onDelete,
    onDeleteAll,
    onRemove,
    onAdd,
    setSignupOpen,
    setLoginOpen,
  } = props;
  const authMember = false; // Replace with your authentication logic

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" alt="Logo" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>{" "}
            <Box className="hover-line">
              <NavLink to="/products" activeClassName="underline">
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            <Basket
              cartItems={cartItems}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              onRemove={onRemove}
              onAdd={onAdd}
            />
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                alt=""
                src="/icons/default-user.svg"
                aria-haspopup="true"
                className="user"
              />
            )}
          </Stack>
        </Stack>
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-text"}>
              World's Most Delicious Cuisine
            </Box>
            <Box className={"wel-text"}>The Choice, not just a choice</Box>
            <Box className={"service-text"}>24 hours service</Box>
            <Box className={"signup"}>
              {!authMember ? (
                <Button
                  variant="contained"
                  className="signup-button"
                  onClick={() => setSignupOpen(true)}
                >
                  Sign Up
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className={"logo-frame"}>
            <div className={"logo-img"}></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
