const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);

    const response = await newMenu.save();
    console.log("data saved successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const itemTaste = req.params.taste;
    const data = await Menu.find({ taste: itemTaste });

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
    const menuId = req.params.id;
    const updateData = req.body;
    const response = await User.findByIdAndUpdate(menuId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
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
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }

    console.log("data deleted successfully");
    res.status(200).json({ message: "Menu deleted sucessfully!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
