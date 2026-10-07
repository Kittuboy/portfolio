const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (
            !admin ||
            !(await bcrypt.compare(password, admin.passwordHash))
        ) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            token,
            admin: {
                email: admin.email,
            },
        });
    } catch (error) {
        next(error);
    }
});


// Signup


router.post("/signup", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 Character",
            });
        }

        const existinguser = await
            Admin.findOne({ email });

        if (existinguser) {
            return res.status(409).json({
                success: false,
                message: "Email already Exist",
            });
        }


        const hashedPassword = await
            bcrypt.hash(password, 10);


        //create user

        const user = await Admin.create({
            email,
            password: hashedPassword,
        });


        res.status(201).json({
            success: true,
            message: "Signup Successfull",
            user: {
                id: user._id,
                email: user.email,
            },
        });


    } catch (error) {
        next(error);
    }
});

module.exports = router;