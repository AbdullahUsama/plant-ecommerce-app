// controllers/uploadController.js
const uploadFile = (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const url = `http://localhost:5000/uploads/${file.filename}`;
    res.status(200).json({ url });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
};

module.exports = { uploadFile };
