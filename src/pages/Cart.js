import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      setLoading(false);
      return;
    }

    Promise.all(
      cart.map((item) =>
        fetch(`https://fakestoreapi.com/products/${item.id}`)
          .then((res) => res.json())
          .then((product) => ({
            ...product,
            quantity: item.quantity || 1,
          }))
      )
    ).then((products) => {
      setCartItems(products);
      setLoading(false);
    });
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  if (loading) {
    return <Typography align="center">Đang tải giỏ hàng...</Typography>;
  }

  if (cartItems.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Giỏ hàng trống
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Giỏ hàng
      </Typography>

      {cartItems.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: 80, height: 100, objectFit: "contain" }}
            />

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">
                {item.title}
              </Typography>
              <Typography color="text.secondary">
                Giá: ${item.price}
              </Typography>
              <Typography>
                Số lượng: {item.quantity}
              </Typography>
            </Box>

            <Typography fontWeight="bold">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Tổng tiền: ${getTotalPrice().toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={handleClearCart}
        >
          Xóa giỏ hàng
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;


