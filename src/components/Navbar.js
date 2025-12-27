import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/home")}>Home</Button>
        <Button color="inherit" onClick={() => navigate("/cart")}>Cart</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
