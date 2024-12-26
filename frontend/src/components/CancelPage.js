import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CancelPage() {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Timer to count down from 10 to 0
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect to /user after 10 seconds
    const timeout = setTimeout(() => {
      navigate("/user");
    }, 10000);

    // Cleanup interval and timeout on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        {/* Big red cross icon */}
        <div className="text-red-500 text-9xl mb-6">
          <i className="fas fa-times-circle"></i>
        </div>

        {/* Cancel message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Payment Canceled
        </h1>
        <p className="text-lg text-gray-600">
          You will be redirected to the homepage in {countdown} seconds.
        </p>
      </div>
    </div>
  );
}
