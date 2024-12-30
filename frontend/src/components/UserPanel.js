//-----------side panel cart----------------------------
// src/UserPanel.js
// import React, { useEffect, useState, useContext } from "react";
// import Navbar from "./Navbar";
// import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa"; // Importing sun and moon icons
// import { FaPlus, FaMinus } from "react-icons/fa";
// import backgroundImage from "./img/background.png";
// import Footer from "./Footer";
// import { ThemeContext } from ".././ThemeContext"; // Import ThemeContext

// const UserPanel = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded
//   const [cartItems, setCartItems] = useState([]); // Track items in the cart
//   const [isCartOpen, setIsCartOpen] = useState(false); // Track cart panel visibility
//   const [successMessage, setSuccessMessage] = useState(null); // Track success messages
//   const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Use ThemeContext

//   // Calculate total price of the cart
//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.quantity * item.price,
//     0
//   );

//   // Calculate total cart count
//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   // Fetch products from the API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/products");
//         const data = await response.json();
//         if (response.ok) {
//           setProducts(data);
//         } else {
//           setError(data.message || "Error fetching products");
//         }
//       } catch (err) {
//         setError("An error occurred while fetching products");
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Handle adding products to the cart
//   const addToCart = (productId, productName, productPrice) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === productId);
//       if (existingItem) {
//         // If item exists, increase quantity
//         return prevItems.map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // If item doesn't exist, add new item with quantity 1
//         return [
//           ...prevItems,
//           {
//             id: productId,
//             name: productName,
//             price: productPrice,
//             quantity: 1,
//           },
//         ];
//       }
//     });
//     setSuccessMessage(`✅ ${productName} has been added to your cart!`); // Set success message
//   };

//   // Toggle card expansion
//   const toggleExpandCard = (index) => {
//     setExpandedCard((prev) => (prev === index ? null : index)); // Toggle expanded card
//     setSuccessMessage(null); // Clear any existing success messages when toggling cards
//   };

//   // Handle cart icon click to open the cart panel
//   const handleCartClick = () => {
//     setIsCartOpen(true); // Open the cart panel
//   };

//   // Effect to auto-dismiss success messages after 3 seconds
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage(null); // Clear the success message
//       }, 3000); // 3 seconds

//       // Cleanup the timer if the component unmounts or successMessage changes
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const handleCheckout = async () => {
//     if (cartItems.length === 0) {
//       console.log("Cart is empty");
//       return; // Prevent proceeding with checkout if cart is empty
//     }
//     console.log("Checkout clicked");
//     // Prepare selected items
//     const selectedItems = {
//       items: cartItems.map((item) => ({
//         id: item.id, // Keep the id the same
//         quantity: item.quantity, // Keep the quantity as is
//       })),
//     };
//     try {
//       const response = await fetch("http://localhost:5000/get-all-products");
//       const allProducts = await response.json();
//       const result = allProducts.map((product) => ({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//       }));

//       const storeInventory = new Map(
//         result.map((item) => [
//           item._id,
//           { priceInCents: item.price, name: item.name },
//         ])
//       );

//       let totalPriceInCents = 0;

//       // Iterate through selected items
//       for (let i = 0; i < selectedItems.items.length; i++) {
//         const { id, quantity } = selectedItems.items[i];
//         const product = storeInventory.get(id);

//         if (product) {
//           totalPriceInCents += product.priceInCents * quantity;
//         } else {
//           console.warn(`Product with ID ${id} not found in store inventory.`);
//         }
//       }

//       console.log(`Total Price: ${totalPriceInCents} cents`);

//       if (totalPriceInCents >= 150) {
//         const finalCheckoutResult = await fetch(
//           "http://localhost:5000/stripe-payout-session",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               selectedItems,
//               storeInventory: Array.from(storeInventory),
//             }),
//           }
//         )
//           .then((res) => {
//             if (res.ok) return res.json();
//             return res.json().then((json) => Promise.reject(json));
//           })
//           .then(({ url }) => {
//             console.log(url);
//             window.location = url;
//           })
//           .catch((e) => {
//             console.error(e.error);
//           });
//       } else {
//         console.log("Price must be greater than Rs. 150");
//         alert("Total Price must be greater than Rs. 150");
//       }
//     } catch (e) {
//       console.log("Error: ", e);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       {/* Main Container */}
//       <div
//         className={`min-h-screen relative transition-colors duration-300 ${
//           darkMode ? "bg-gray-900" : "bg-green-50"
//         }`}
//       >
//         <div className="container mx-auto py-8 px-4 relative">
//           {/* Top Right Controls: Dark Mode Toggle and Cart Icon */}
//           <div className="absolute top-4 right-4 flex space-x-4">
//             {/* Dark Mode Toggle Button */}
//             <button
//               onClick={toggleDarkMode}
//               className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
//               aria-label="Toggle Dark Mode"
//             >
//               {darkMode ? <FaSun /> : <FaMoon />}
//             </button>

//             {/* Cart Icon */}
//             <button
//               onClick={handleCartClick} // Open the cart panel
//               className="relative text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 focus:outline-none"
//               aria-label="Open cart"
//             >
//               <FaShoppingCart size={24} />
//               {cartCount > 0 && (
//                 <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
//               )}
//             </button>
//           </div>

//           <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 text-center mb-8">
//             Explore Our Products
//           </h2>
//           {error && (
//             <div className="text-red-500 dark:text-red-400 text-center mb-4">
//               {error}
//             </div>
//           )}

//           {/* Background and Cards */}
//           <div className="relative">
//             {expandedCard !== null && (
//               <div
//                 className="fixed inset-0 bg-gray-800 bg-opacity-40 z-10"
//                 onClick={() => setExpandedCard(null)}
//               ></div>
//             )}

//             <div
//               className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${
//                 expandedCard !== null ? "relative" : ""
//               }`}
//             >
//               {products.map((product, index) => {
//                 // Determine if the card should be blurred
//                 const isBlurred =
//                   expandedCard !== null && expandedCard !== index;

//                 return (
//                   <div
//                     key={product._id}
//                     className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-transform transform ${
//                       expandedCard === index
//                         ? "scale-105 shadow-2xl z-20 cursor-pointer"
//                         : "hover:shadow-xl cursor-pointer"
//                     } ${isBlurred ? "blur-sm pointer-events-none" : ""}`}
//                     onClick={() => toggleExpandCard(index)} // Toggle card expansion
//                   >
//                     <img
//                       src={product.img}
//                       alt={product.name}
//                       className="w-full h-48 object-cover rounded-t-md"
//                     />
//                     <div className="p-4">
//                       <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//                         {product.name}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
//                         Category: {product.category}
//                       </p>
//                       <p className="text-gray-600 dark:text-gray-400 mb-4">
//                         Price: Rs.{product.price}
//                       </p>

//                       {/* Conditionally render additional details */}
//                       {expandedCard === index && (
//                         <div className="mt-4 text-gray-700 dark:text-gray-300 relative">
//                           {/* Success Message */}
//                           {successMessage && (
//                             <div className="mb-2 bg-green-100 dark:bg-green-700 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-100 px-4 py-2 rounded-md shadow-lg flex items-center transition-opacity duration-500">
//                               <span className="mr-2">{successMessage}</span>
//                               <svg
//                                 className="w-4 h-4 fill-current text-green-700 dark:text-green-100 cursor-pointer"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 onClick={() => setSuccessMessage(null)} // Allow manual dismissal
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M10 8.586L15.95 2.636a1 1 0 011.414 1.414L11.414 10l5.95 5.95a1 1 0 01-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 01-1.414-1.414L8.586 10 2.636 4.05a1 1 0 011.414-1.414L10 8.586z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </div>
//                           )}

//                           <p className="text-sm mb-2">
//                             <strong>Stock:</strong> {product.stock}
//                           </p>
//                           <p className="text-sm mb-2">
//                             <strong>Description:</strong> {product.description}
//                           </p>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent card toggle on button click
//                               addToCart(
//                                 product._id,
//                                 product.name,
//                                 product.price
//                               ); // Pass product details
//                             }}
//                             className="w-full py-2 bg-green-600 dark:bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-700 dark:hover:bg-green-600 transition focus:outline-none"
//                           >
//                             Add to Cart
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Side Panel for Cart */}
//         {isCartOpen && (
//           <>
//             {/* Overlay */}
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 z-30"
//               onClick={() => setIsCartOpen(false)}
//             ></div>

//             {/* Side Panel */}
//             <div className="fixed top-0 right-0 w-80 bg-white dark:bg-gray-800 h-full shadow-lg z-40 transform transition-transform duration-300">
//               <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//                   Your Cart
//                 </h2>
//                 <button
//                   onClick={() => setIsCartOpen(false)}
//                   aria-label="Close cart"
//                 >
//                   <svg
//                     className="w-6 h-6 text-gray-700 dark:text-gray-300"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
//                 {cartItems.length === 0 ? (
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Your cart is empty.
//                   </p>
//                 ) : (
//                   cartItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-2"
//                     >
//                       <div>
//                         <h3 className="font-medium text-gray-800 dark:text-gray-200">
//                           {item.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           Quantity: {item.quantity}
//                         </p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() =>
//                             setCartItems((prevItems) =>
//                               prevItems.map((cartItem) =>
//                                 cartItem.id === item.id
//                                   ? {
//                                       ...cartItem,
//                                       quantity: cartItem.quantity + 1,
//                                     }
//                                   : cartItem
//                               )
//                             )
//                           }
//                           className="flex items-center justify-center w-8 h-8 bg-green-300 dark:bg-green-600 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
//                           aria-label="Increase quantity"
//                         >
//                           <FaPlus />
//                         </button>

//                         <button
//                           onClick={() =>
//                             setCartItems((prevItems) =>
//                               prevItems
//                                 .map((cartItem) =>
//                                   cartItem.id === item.id
//                                     ? {
//                                         ...cartItem,
//                                         quantity: cartItem.quantity - 1,
//                                       }
//                                     : cartItem
//                                 )
//                                 .filter((cartItem) => cartItem.quantity > 0)
//                             )
//                           }
//                           className="flex items-center justify-center w-8 h-8 bg-red-300 dark:bg-red-600 text-white rounded-full hover:bg-red-700 dark:hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
//                           aria-label="Decrease quantity"
//                         >
//                           <FaMinus />
//                         </button>
//                         <button
//                           onClick={() =>
//                             setCartItems((prevItems) =>
//                               prevItems.filter(
//                                 (cartItem) => cartItem.id !== item.id
//                               )
//                             )
//                           }
//                           className="px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
//                           aria-label="Remove item"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//                 {cartItems.length > 0 && (
//                   <div className="mt-4 border-t dark:border-gray-700 pt-2">
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                       Total Price: Rs.{totalPrice}
//                     </h3>
//                   </div>
//                 )}

//                 {cartItems.length > 0 && (
//                   <button
//                     className="w-full py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
//                     onClick={handleCheckout}
//                   >
//                     Checkout
//                   </button>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UserPanel;

//----smooth cart functionality--------------
// src/UserPanel.js
import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa"; // Importing sun and moon icons
import { FaPlus, FaMinus } from "react-icons/fa";
import backgroundImage from "./img/background.png";
import Footer from "./Footer";
import { ThemeContext } from ".././ThemeContext"; // Import ThemeContext

const UserPanel = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded
  const [cartItems, setCartItems] = useState([]); // Track items in the cart
  const [isCartOpen, setIsCartOpen] = useState(false); // Track cart panel visibility
  const [successMessage, setSuccessMessage] = useState(null); // Track success messages
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Use ThemeContext

  // New State Variables for Category Filtering
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to 'All'
  const [categories, setCategories] = useState([]); // To store unique categories

  // Calculate total price of the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Calculate total cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
          // Extract unique categories from fetched products
          const uniqueCategories = Array.from(
            new Set(data.map((product) => product.category))
          );
          setCategories(uniqueCategories);
        } else {
          setError(data.message || "Error fetching products");
        }
      } catch (err) {
        setError("An error occurred while fetching products");
      }
    };

    fetchProducts();
  }, []);

  // Handle adding products to the cart
  const addToCart = (productId, productName, productPrice) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add new item with quantity 1
        return [
          ...prevItems,
          {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
          },
        ];
      }
    });
    setSuccessMessage(`✅ ${productName} Added!`); // Set success message
  };

  // Toggle card expansion
  const toggleExpandCard = (index) => {
    setExpandedCard((prev) => (prev === index ? null : index)); // Toggle expanded card
    setSuccessMessage(null); // Clear any existing success messages when toggling cards
  };

  // Handle cart icon click to open the cart panel
  const handleCartClick = () => {
    setIsCartOpen(true); // Open the cart panel
  };

  // Handle cart close (clicking on overlay or close button)
  const handleCartClose = () => {
    setIsCartOpen(false); // Close the cart panel
  };

  // Effect to auto-dismiss success messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null); // Clear the success message
      }, 3000); // 3 seconds

      // Cleanup the timer if the component unmounts or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      console.log("Cart is empty");
      return; // Prevent proceeding with checkout if cart is empty
    }
    console.log("Checkout clicked");
    // Prepare selected items
    const selectedItems = {
      items: cartItems.map((item) => ({
        id: item.id, // Keep the id the same
        quantity: item.quantity, // Keep the quantity as is
      })),
    };
    try {
      const response = await fetch("http://localhost:5000/get-all-products");
      const allProducts = await response.json();
      const result = allProducts.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
      }));

      const storeInventory = new Map(
        result.map((item) => [
          item._id,
          { priceInCents: item.price, name: item.name },
        ])
      );

      let totalPriceInCents = 0;

      // Iterate through selected items
      for (let i = 0; i < selectedItems.items.length; i++) {
        const { id, quantity } = selectedItems.items[i];
        const product = storeInventory.get(id);

        if (product) {
          totalPriceInCents += product.priceInCents * quantity;
        } else {
          console.warn(`Product with ID ${id} not found in store inventory.`);
        }
      }

      console.log(`Total Price: ${totalPriceInCents} cents`);

      if (totalPriceInCents >= 150) {
        const finalCheckoutResult = await fetch(
          "http://localhost:5000/stripe-payout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              selectedItems,
              storeInventory: Array.from(storeInventory),
            }),
          }
        )
          .then((res) => {
            if (res.ok) return res.json();
            return res.json().then((json) => Promise.reject(json));
          })
          .then(({ url }) => {
            console.log(url);
            window.location = url;
          })
          .catch((e) => {
            console.error(e.error);
          });
      } else {
        console.log("Price must be greater than Rs. 150");
        alert("Total Price must be greater than Rs. 150");
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  // Handle Category Selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setExpandedCard(null); // Collapse any expanded card when category changes
    setSuccessMessage(null); // Clear success messages
  };

  // Filtered Products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Navbar />
      {/* Main Container */}
      <div
        className={`min-h-screen relative transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-green-50"
        }`}
      >
        <div className="container mx-auto py-8 px-4 relative">
          {/* Top Right Controls: Dark Mode Toggle and Cart Icon */}
          <div className="absolute top-4 right-4 flex space-x-4">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Cart Icon */}
            <button
              onClick={handleCartClick} // Open the cart panel
              className="relative text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 focus:outline-none"
              aria-label="Open cart"
            >
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
              )}
            </button>
          </div>

          <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 text-center mb-8">
            Explore Our Products
          </h2>
          {error && (
            <div className="text-red-500 dark:text-red-400 text-center mb-4">
              {error}
            </div>
          )}

          {/* Category Filter Buttons */}
          <div className="flex justify-center mb-6 flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect("All")}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === "All"
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Background and Cards */}
          <div className="relative">
            {expandedCard !== null && (
              <div
                className="fixed inset-0 bg-gray-800 bg-opacity-40 z-10"
                onClick={() => setExpandedCard(null)}
              ></div>
            )}

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${
                expandedCard !== null ? "relative" : ""
              }`}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                  // Determine if the card should be blurred
                  const isBlurred =
                    expandedCard !== null && expandedCard !== index;

                  return (
                    <div
                      key={product._id}
                      className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-transform transform ${
                        expandedCard === index
                          ? "scale-105 shadow-2xl z-20 cursor-pointer"
                          : "hover:shadow-xl cursor-pointer"
                      } ${isBlurred ? "blur-sm pointer-events-none" : ""}`}
                      onClick={() => toggleExpandCard(index)} // Toggle card expansion
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-md"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          Category: {product.category}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Price: Rs.{product.price}
                        </p>

                        {/* Conditionally render additional details */}
                        {expandedCard === index && (
                          <div className="mt-4 text-gray-700 dark:text-gray-300 relative">
                            {/* Success Message */}
                            {successMessage && (
                              <div className="mb-2 bg-green-100 dark:bg-green-700 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-100 px-4 py-2 rounded-md shadow-lg flex items-center transition-opacity duration-500">
                                <span className="mr-2">{successMessage}</span>
                                <svg
                                  className="w-4 h-4 fill-current text-green-700 dark:text-green-100 cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  onClick={() =>
                                    setSuccessMessage(null)
                                  } /* Allow manual dismissal */
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 8.586L15.95 2.636a1 1 0 011.414 1.414L11.414 10l5.95 5.95a1 1 0 01-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 01-1.414-1.414L8.586 10 2.636 4.05a1 1 0 011.414-1.414L10 8.586z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}

                            <p className="text-sm mb-2">
                              <strong>Stock:</strong> {product.stock}
                            </p>
                            <p className="text-sm mb-2">
                              <strong>Description:</strong>{" "}
                              {product.description}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card toggle on button click
                                addToCart(
                                  product._id,
                                  product.name,
                                  product.price
                                ); // Pass product details
                              }}
                              className="w-full py-2 bg-green-600 dark:bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-700 dark:hover:bg-green-600 transition focus:outline-none"
                            >
                              Add to Cart
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                // Display message when no products are available for the selected category
                <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
                  No products to display.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel for Cart with Animation */}
        {/* Always render the overlay and cart panel */}
        <div
          className={`fixed inset-0 z-30 transition-opacity duration-300 ${
            isCartOpen
              ? "opacity-50 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } bg-black bg-opacity-50`}
          onClick={handleCartClose}
          aria-hidden={isCartOpen ? "false" : "true"}
        ></div>

        <div
          className={`fixed top-0 right-0 w-80 bg-white dark:bg-gray-800 h-full shadow-lg z-40 transform transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!isCartOpen ? "true" : "false"}
        >
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Your Cart
            </h2>
            <button onClick={handleCartClose} aria-label="Close cart">
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
            {cartItems.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-2"
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setCartItems((prevItems) =>
                          prevItems.map((cartItem) =>
                            cartItem.id === item.id
                              ? {
                                  ...cartItem,
                                  quantity: cartItem.quantity + 1,
                                }
                              : cartItem
                          )
                        )
                      }
                      className="flex items-center justify-center w-8 h-8 bg-green-300 dark:bg-green-600 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>

                    <button
                      onClick={() =>
                        setCartItems((prevItems) =>
                          prevItems
                            .map((cartItem) =>
                              cartItem.id === item.id
                                ? {
                                    ...cartItem,
                                    quantity: cartItem.quantity - 1,
                                  }
                                : cartItem
                            )
                            .filter((cartItem) => cartItem.quantity > 0)
                        )
                      }
                      className="flex items-center justify-center w-8 h-8 bg-red-300 dark:bg-red-600 text-white rounded-full hover:bg-red-700 dark:hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <button
                      onClick={() =>
                        setCartItems((prevItems) =>
                          prevItems.filter(
                            (cartItem) => cartItem.id !== item.id
                          )
                        )
                      }
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
            {cartItems.length > 0 && (
              <div className="mt-4 border-t dark:border-gray-700 pt-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Total Price: Rs.{totalPrice}
                </h3>
              </div>
            )}

            {cartItems.length > 0 && (
              <button
                className="w-full py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPanel;
