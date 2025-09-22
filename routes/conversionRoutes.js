// const express = require("express");
// const router = express.Router();
// const Conversion = require("../models/Conversion");

// // 🟢 Get all conversion history
// router.get("/", async (req, res) => {
//   try {
//     const history = await Conversion.find().sort({ timestamp: -1 });
//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch history" });
//   }
// });

// // 🔵 Add new conversion record
// router.post("/", async (req, res) => {
//   try {
//     const { originalName, convertedName, fromType, toType, downloadUrl } =
//       req.body;

//     const newRecord = new Conversion({
//       originalName,
//       convertedName,
//       fromType,
//       toType,
//       downloadUrl,
//     });

//     await newRecord.save();
//     res.status(201).json(newRecord);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save record" });
//   }
// });

// module.exports = router;


// import express from "express";
// import Conversion from "../model/conversion.js";

// const router = express.Router();

// // Get history
// router.get("/", async (req, res) => {
//   try {
//     const history = await Conversion.find().sort({ timestamp: -1 }).limit(10);
//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch history" });
//   }
// });

// // Save new record
// router.post("/", async (req, res) => {
//   try {
//     const record = new Conversion(req.body);
//     await record.save();
//     res.status(201).json(record);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save record" });
//   }
// });

// export default router;


import express from "express";
import conversion from "../model/conversion.js";

const router = express.Router();

// Fetch all conversions
router.get("/", async (req, res) => {
  try {
    const records = await conversion.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch conversions" });
  }
});

// Save a new conversion
router.post("/", async (req, res) => {
  try {
    const { originalName, convertedName, fromType, toType, downloadUrl } = req.body;
    const newRecord = new conversion({
      originalName,
      convertedName,
      fromType,
      toType,
      downloadUrl
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Save error:", error.message);
    res.status(500).json({ error: "Failed to save conversion" });
  }
});


// Delete a conversion record by _id
// Delete a conversion record by ID
router.delete("/:id", async (req, res) => {
  console.log("Delete request ID:", req.params.id);
  try {
    const { id } = req.params;
    const deleted = await conversion.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Optionally, delete the converted file from disk
    const convertedPath = path.join(__dirname, "../converted", deleted.convertedName);
    if (fs.existsSync(convertedPath)) {
      fs.unlinkSync(convertedPath);
    }

    res.json({ message: "Record deleted successfully", id });
  } catch (error) {
    console.error("Delete conversion error:", error.message);
    res.status(500).json({ message: "Failed to delete record" });
  }
});




export default router;

