// import React, { useState } from "react";
// import Navbar from "./Navbar";

// const AdminPanel = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     stock: "",
//   });

//   const [notification, setNotification] = useState(""); // For the green notification

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   // Show notification for a few seconds
//   const showNotification = (message) => {
//     setNotification(message);
//     setTimeout(() => {
//       setNotification("");
//     }, 3000); // Notification disappears after 3 seconds
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(product),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         showNotification("Product added successfully!");
//         setProduct({
//           name: "",
//           description: "",
//           price: "",
//           category: "",
//           stock: "",
//         });
//       } else {
//         showNotification(data.message || "Error adding product");
//       }
//     } catch (error) {
//       showNotification("An error occurred while adding the product");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-10">
//         <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
//           Add Product
//         </h2>

//         {/* Notification */}
//         {notification && (
//           <div className="text-sm bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4">
//             {notification}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Product Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               required
//               placeholder="Enter product name"
//               className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               required
//               placeholder="Enter product description"
//               rows="3"
//               className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Price
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 required
//                 placeholder="Price"
//                 className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Stock
//               </label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={product.stock}
//                 onChange={handleChange}
//                 required
//                 placeholder="Stock"
//                 className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Category
//             </label>
//             <select
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm bg-white"
//             >
//               <option value="" disabled>
//                 Select a category
//               </option>
//               <option value="Sampling">Sampling</option>
//               <option value="Plant">Plant</option>
//               <option value="Trees">Trees</option>
//               <option value="Pots">Pots</option>
//               <option value="Decorations">Decorations</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AdminPanel;

//-------with img upoad------------------
import React, { useState } from "react";
import Navbar from "./Navbar";

const AdminPanel = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    img: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the image file and get the URL
      const formData = new FormData();
      formData.append("file", file);
      const uploadResponse = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const { url } = await uploadResponse.json();

      const productData = { ...product, img: url };

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          img: "",
        });
        setFile(null);
      } else {
        alert(data.message || "Error adding product");
      }
    } catch (error) {
      alert("An error occurred while adding the product");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              placeholder="Enter product description"
              rows="3"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                placeholder="Price"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
                placeholder="Stock"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm bg-white"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Sampling">Sampling</option>
              <option value="Plant">Plant</option>
              <option value="Trees">Trees</option>
              <option value="Pots">Pots</option>
              <option value="Decorations">Decorations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminPanel;
