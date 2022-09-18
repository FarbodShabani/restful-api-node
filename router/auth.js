const express = require("express");


const router = express.Router();

const authController = require("../controller/auth");
const { signUpValidation } = require("../validation/auth");


router.put("/signUp", signUpValidation, authController.signUp);

router.post("/login", authController.login);

module.exports = router;