import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <UserProvider>
            <AppRoutes />
            <ToastContainer position="bottom-right" autoClose={3000} />
          </UserProvider>
    </CartProvider>
    </BrowserRouter>
    
  );
}

export default App;
