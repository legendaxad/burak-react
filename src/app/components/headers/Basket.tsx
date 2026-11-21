import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";

interface BasketProps {
  cartItems: CartItem[];
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onRemove: (item: CartItem) => void;
  onAdd: (item: CartItem) => void;
}

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 5;

const money = (n: number) => `$${n.toFixed(2)}`;

export default function Basket(props: BasketProps) {
  const { cartItems, onDelete, onDeleteAll, onRemove, onAdd } = props;
  const authMember = null;
  const history = useHistory();

  /** CALCULATIONS **/
  const itemsPrice = cartItems.reduce(
    (a: number, c: CartItem) => a + c.price * c.quantity,
    0,
  );
  const itemsCount = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity,
    0,
  );
  const shippingCost =
    itemsPrice > 0 && itemsPrice < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const totalPrice = itemsPrice + shippingCost;
  const leftForFree = Math.max(FREE_SHIPPING_THRESHOLD - itemsPrice, 0);
  const shippingProgress = Math.min(
    (itemsPrice / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basket-button"
        aria-controls={open ? "basket-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={itemsCount} color="secondary" max={99}>
          <img src={"/icons/shopping-cart.svg"} alt="Shopping Cart" />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="basket-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{ sx: { p: 0 } }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 380,
              maxWidth: "calc(100vw - 32px)",
              mt: 1.5,
              borderRadius: 3,
              overflow: "visible",
              border: "1px solid",
              borderColor: "divider",
              filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.16))",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 18,
                width: 12,
                height: 12,
                bgcolor: "background.paper",
                borderLeft: "1px solid",
                borderTop: "1px solid",
                borderColor: "divider",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack sx={{ position: "relative", zIndex: 1 }}>
          {/* HEADER */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2.5, pt: 2, pb: 1.5 }}
          >
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="h6" fontWeight={700}>
                Your cart
              </Typography>
              {itemsCount > 0 && (
                <Typography variant="body2" color="text.secondary">
                  {itemsCount} {itemsCount === 1 ? "item" : "items"}
                </Typography>
              )}
            </Stack>
            {cartItems.length > 0 && (
              <Button
                size="small"
                color="error"
                startIcon={<DeleteSweepOutlinedIcon fontSize="small" />}
                onClick={onDeleteAll}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Clear all
              </Button>
            )}
          </Stack>
          <Divider />

          {cartItems.length === 0 ? (
            /* EMPTY STATE */
            <Stack alignItems="center" spacing={1.5} sx={{ px: 3, py: 5 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  bgcolor: "action.hover",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <ShoppingBagOutlinedIcon
                  sx={{ fontSize: 36, color: "text.secondary" }}
                />
              </Box>
              <Typography fontWeight={600}>Your cart is empty</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Browse the menu and add something you like.
              </Typography>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{ textTransform: "none", borderRadius: 2, mt: 1 }}
              >
                Continue shopping
              </Button>
            </Stack>
          ) : (
            <>
              {/* FREE SHIPPING PROGRESS */}
              <Box sx={{ px: 2.5, py: 1.5, bgcolor: "action.hover" }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <LocalShippingOutlinedIcon
                    fontSize="small"
                    color={leftForFree === 0 ? "success" : "action"}
                  />
                  <Typography variant="body2">
                    {leftForFree === 0 ? (
                      <b>You've unlocked free shipping!</b>
                    ) : (
                      <>
                        Add <b>{money(leftForFree)}</b> more for free shipping
                      </>
                    )}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={shippingProgress}
                  color={leftForFree === 0 ? "success" : "primary"}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>

              {/* ITEMS */}
              <Stack
                divider={<Divider flexItem />}
                sx={{ maxHeight: 340, overflowY: "auto", px: 2.5 }}
              >
                {cartItems.map((item: CartItem) => {
                  const imagePath = `${serverApi}/${item.image}`;
                  return (
                    <Stack
                      key={item._id}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{ py: 1.5 }}
                    >
                      <Box
                        component="img"
                        src={imagePath}
                        alt={item.name}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          objectFit: "cover",
                          flexShrink: 0,
                          bgcolor: "action.hover",
                        }}
                      />

                      <Stack sx={{ flex: 1, minWidth: 0 }} spacing={0.75}>
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          spacing={1}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            noWrap
                            title={item.name}
                          >
                            {item.name}
                          </Typography>
                          <Tooltip title="Remove item">
                            <IconButton
                              size="small"
                              onClick={() => onDelete(item)}
                              sx={{ mt: -0.5, mr: -0.75 }}
                            >
                              <CloseRoundedIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>

                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          {/* QUANTITY STEPPER */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            sx={{
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: 5,
                            }}
                          >
                            <IconButton
                              size="small"
                              aria-label="decrease quantity"
                              onClick={() => onRemove(item)}
                            >
                              <RemoveIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              sx={{ minWidth: 24, textAlign: "center" }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              aria-label="increase quantity"
                              onClick={() => onAdd(item)}
                            >
                              <AddIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Stack>

                          <Stack alignItems="flex-end">
                            <Typography variant="body2" fontWeight={700}>
                              {money(item.price * item.quantity)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {money(item.price)} each
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>

              {/* SUMMARY */}
              <Divider />
              <Stack spacing={0.75} sx={{ px: 2.5, pt: 1.5, pb: 2.5 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2">{money(itemsPrice)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography
                    variant="body2"
                    color={shippingCost === 0 ? "success.main" : "text.primary"}
                    fontWeight={shippingCost === 0 ? 600 : 400}
                  >
                    {shippingCost === 0 ? "Free" : money(shippingCost)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 0.5 }}
                >
                  <Typography fontWeight={700}>Total</Typography>
                  <Typography variant="h6" fontWeight={800}>
                    {money(totalPrice)}
                  </Typography>
                </Stack>

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  sx={{
                    mt: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    py: 1.25,
                    boxShadow: "none",
                  }}
                >
                  Checkout · {money(totalPrice)}
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
