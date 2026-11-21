import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
interface OtherNavbarProps {
  cartItems: CartItem[];
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onRemove: (item: CartItem) => void;
  onAdd: (item: CartItem) => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
}
export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onDelete,
    onDeleteAll,
    onRemove,
    onAdd,
    setSignupOpen,
    setLoginOpen,
  } = props;
  const authMember = true; // Replace with your authentication logic
  return (
    <div className="other-navbar">
      <Container className="other-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" alt="Logo" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/">Home</NavLink>
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
      </Container>
    </div>
  );
}
