const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signUp", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);

    const response = await newUser.save();
    console.log("data saved successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    console.log("data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:designation", async (req, res) => {
  try {
    const workType = req.params.designation;
    const data = await User.find({ designation: workType });

    if (data.length > 0) {
      console.log("data fetched successfully");
      res.status(200).json(data);
    } else {
      console.log("No data found");
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const response = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("data updated successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.findByIdAndDelete(userId);

    if (!response) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("data deleted successfully");
    res.status(200).json({ message: "User deleted sucessfully!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
