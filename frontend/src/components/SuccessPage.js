import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // Importing Clerk's useUser hook

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser(); // Accessing the authenticated user

  const [order, setOrder] = useState([]);
  const [username, setUsername] = useState("Abdullah");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract session_id from query parameters
  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");

  useEffect(() => {
    // Set username from Clerk's user object
    if (user) {
      setUsername(user.firstName || user.fullName);
    }

    // Function to fetch order details from the backend
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setError("No session ID found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/orders/success?session_id=${sessionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order details.");
        }
        const data = await response.json();
        setOrder(data.order); // Assuming the backend returns { order: [...] }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching your order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId, user]);

  // Calculate total price
  const totalPrice = order.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Handler for "Back to Homepage" button
  const handleBackToHomepage = () => {
    navigate("/"); // Adjust the path if your homepage route is different
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-center mb-6">
          <div className="text-green-500 text-9xl">
            <i className="fas fa-check-circle"></i>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 text-center mb-4">
          Thank You, {username}!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">
          Your order has been placed successfully.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleBackToHomepage}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition-colors duration-200 focus:outline-none"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
