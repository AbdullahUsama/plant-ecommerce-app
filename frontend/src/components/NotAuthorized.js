export default function NotAuthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-red-600 dark:text-red-400 mb-4">
          You are not Authorized
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Sorry, you do not have permission to view this page.
        </p>
        <a
          href="/"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-6 py-3"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
}
