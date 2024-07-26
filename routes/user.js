const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);

    const response = await newUser.save();
    console.log("data saved successfully");

    const payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToken(payload);

    console.log("Token is:", token);
    res.status(200).json({
      message: "User created successfully",
      Token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);
    return res.json({
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.findById(user.id);
    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Internal Server Error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await User.find();
    console.log("data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:designation", jwtAuthMiddleware, async (req, res) => {
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

router.put("/:id", jwtAuthMiddleware, async (req, res) => {
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

router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
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
