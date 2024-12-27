import React, { useEffect, useState } from "react";
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

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productId, setProductId] = useState("");
  const [file, setFile] = useState(null); // For Add Product Form
  const [updateFile, setUpdateFile] = useState(null); // For Update Product Form

  useEffect(() => {
    const handleClickOutside = (event) => {
      const form = document.getElementById("updateForm");
      if (form && !form.contains(event.target)) {
        setShowUpdateForm(false); // Close the form
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Attach event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, [setShowUpdateForm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.message || "Error fetching products");
        }
      } catch (err) {
        setError("An error occurred while fetching products");
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateFileChange = (e) => {
    setUpdateFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = product.img; // Default to existing image URL

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const productData = { ...product, img: imageUrl };
      // console.log(productData);
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success popup
        setSuccessMessage(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);

        // Reset form fields
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          img: "",
        });
        setFile(null);
        // setShowAddProductForm(false); // Hide the form after submission
      } else {
        throw new Error(data.message || "Failed to add product");
      }
    } catch (error) {
      alert("An error occurred while adding the product: " + error.message);
    }
  };
  // const handleDeleteProduct = async (pid) => {
  //   console.log("inside del funct");
  //   const response = await fetch(`http://localhost:5000/api/products/${pid}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log("Del Message: ", response);
  //   // fetchProducts();
  // };
  const handleDeleteProduct = async (pid) => {
    try {
      console.log("inside del funct");
      const response = await fetch(
        `http://localhost:5000/api/products/${pid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Del Message: ", response);

      if (response.ok) {
        // Update the products state by removing the deleted product
        setProducts(products.filter((product) => product._id !== pid));
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product: " + error.message);
    }
  };

  const handleUpdateClick = async (productId) => {
    console.log(`Update button clicked for product ID: ${productId}`);
    const productToUpdate = products.find((p) => p._id === productId);
    if (productToUpdate) {
      setProduct({
        name: productToUpdate.name,
        description: productToUpdate.description,
        price: productToUpdate.price,
        category: productToUpdate.category,
        stock: productToUpdate.stock,
        img: productToUpdate.img,
      });
      setProductId(productId);
      setShowUpdateForm(true);
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      let imageUrl = data.img; // Default to existing image URL

      if (updateFile) {
        const formData = new FormData();
        formData.append("file", updateFile);
        const uploadResponse = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const updatedProductData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
        img: imageUrl,
      };

      const response = await fetch(
        `http://localhost:5000/update-product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        // Update the product in the local state
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod._id === productId ? { ...prod, ...updatedProductData } : prod
          )
        );

        // Show success popup or any other feedback
        alert("Product updated successfully!");

        // Reset states
        setShowUpdateForm(false);
        setProductId("");
        setUpdateFile(null);
      } else {
        throw new Error(responseData.message || "Failed to update product");
      }
    } catch (error) {
      alert("An error occurred while updating the producttt: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
        Admin Panel
      </h2>
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowAddProductForm(!showAddProductForm)}
          className="px-4 py-2 bg-green-800 text-white font-medium rounded-md shadow hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          Add New Product
        </button>
      </div>

      {showAddProductForm && (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-10 relative">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Add Product
          </h2>

          {successMessage && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-md z-10">
              Added Successfully!
            </div>
          )}

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
                <option value="Sapling">Sapling</option>
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
                // required
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
      )}

      <div className="mt-10 text-center">
        <button
          onClick={() => setShowProducts(!showProducts)}
          className="px-4 py-2 bg-green-800 text-white font-medium rounded-md shadow hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          {/* See All Products */}
          {showProducts ? "Close All Products" : "See All Products"}
        </button>
      </div>

      {showProducts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg p-4 shadow-md"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-700">Price: Rs.{product.price}</p>
              <p className="text-gray-700">Quantity: {product.stock}</p>
              <button
                onClick={() => handleUpdateClick(product._id)}
                className="mt-4 px-3 py-1 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              >
                Delete
              </button>
              {/* {showUpdateForm && <form action="">this is the form</form>} */}
            </div>
          ))}

          {showUpdateForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
              <form
                id="updateForm"
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  const formData = new FormData(e.target); // Collect all form data
                  const data = Object.fromEntries(formData.entries()); // Convert to an object
                  handleUpdateProduct(data); // Pass data to the handler
                }}
                className="bg-white p-6 rounded-md shadow-lg space-y-4 w-full max-w-md"
              >
                <h1 className="text-lg font-bold text-gray-900">
                  Update The Product
                </h1>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={product.name}
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
                    defaultValue={product.description}
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
                      defaultValue={product.price}
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
                      defaultValue={product.stock}
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
                    defaultValue={product.category}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm bg-white"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Sapling">Sapling</option>
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
                    onChange={handleUpdateFileChange}
                    // Removed 'required' to allow optional image update
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  {product.img && (
                    <img
                      src={product.img}
                      alt="Current Product"
                      className="mt-2 w-full h-32 object-cover rounded-md"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                >
                  Update Product
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdminPanel;
