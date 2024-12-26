import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import AdminPanel from "./components/AdminPanel";
import ProtectedRoute from "./ProtectedRoute";
import NotAuthorized from "./components/NotAuthorized";
import LandingPage from "./components/LandingPage";
import UserPanel from "./components/UserPanel";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import CartPage from "./components/CartPage";

// const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function Login() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to '/user' after login only if the user is at '/'
    if (isSignedIn && location.pathname === "/") {
      navigate("/user");
    }
  }, [isSignedIn, location.pathname, navigate]);
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton>Sign In</SignInButton>
        </SignedOut>
        <SignedIn>{/* <UserButton /> */}</SignedIn>
        {/* Routes definition */}
        <Routes>
          <Route path="not-authorized" element={<NotAuthorized />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/cart" element={<CartPage />} />
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
