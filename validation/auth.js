const {body}  = require("express-validator");

const User = require("../models/user");



exports.signUpValidation = [
    body("Email").isEmail().withMessage("plz enter valid email!!").normalizeEmail().custom((value, {req}) => {
        User.findOne({email: value}).then((post) => {if(post) return Promise.reject("this email already exist")})
    }),
    body("password").trim().isLength({min: 5}),
    body("name").isString().notEmpty(),
]