const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// ✅ ROUTES (ORDER DOES NOT BREAK NOW)
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/with-leads", userController.getUsersWithLeadCount);
router.delete("/:id", userController.deleteUser);
router.put("/update-profile", userController.updateProfile);
router.post("/login", userController.loginUser);

module.exports = router;