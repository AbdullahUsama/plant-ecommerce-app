import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import AdminPanel from "./components/AdminPanel";
import ProtectedRoute from "./ProtectedRoute";
import NotAuthorized from "./components/NotAuthorized";
import LandingPage from "./components/LandingPage";
import UserPanel from "./components/UserPanel";
import SuccessPage from "./components/SuccessPage";
import CancelPage from "./components/CancelPage";
import AboutUs from "./components/AboutUs";

import "@fortawesome/fontawesome-free/css/all.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import CartPage from "./components/CartPage";
import ContactUs from "./components/ContactUs";

export default function Login() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Check user's role from metadata
      const role = user.publicMetadata?.role;

      if (role === "admin") {
        // Redirect admin users to '/admin'
        navigate("/admin");
      } else if (location.pathname === "/") {
        // Redirect other signed-in users to '/user' if on '/'
        navigate("/user");
      }
    }
  }, [isLoaded, isSignedIn, user, location.pathname, navigate]);

  return (
    <>
      <header>
        <SignedOut>{/* <SignInButton>Sign In</SignInButton> */}</SignedOut>
        <SignedIn>{/* <UserButton /> */}</SignedIn>
        {/* Routes definition */}
        <Routes>
          <Route path="not-authorized" element={<NotAuthorized />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin" redirectTo="/not-authorized">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </header>
    </>
  );
}
