import React from "react";

const Help = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl relative space-y-6"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none"
        >
          &#10005;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          مدد (Help)
        </h2>

        <div className="space-y-6">
          {/* Example Help Sections */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Add New Product (نیا پروڈکٹ شامل کریں)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              اس بٹن پر کلک کر کے آپ نیا پروڈکٹ شامل کر سکتے ہیں۔ فارم میں تمام
              مطلوبہ معلومات بھر کر "Add Product" پر کلک کریں۔
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              See All Products (تمام پروڈکٹس دیکھیں)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              اس بٹن سے آپ تمام موجودہ پروڈکٹس کی فہرست دیکھ سکتے ہیں۔ یہاں سے
              آپ پروڈکٹس کو اپ ڈیٹ یا حذف کر سکتے ہیں۔
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Update (اپ ڈیٹ)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              کسی پروڈکٹ کے اپ ڈیٹ کے لئے "Update" بٹن پر کلک کریں۔ موجودہ
              معلومات میں ترمیم کر کے "Update Product" پر کلک کریں۔
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Delete (حذف کریں)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              کسی پروڈکٹ کو حذف کرنے کے لئے "Delete" بٹن پر کلک کریں۔ حذف کرنے
              سے پہلے تصدیق کی جاتی ہے۔
            </p>
          </div>

          {/* Add more sections as needed */}
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Close Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
