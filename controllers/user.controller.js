const User = require('../models/user');
const bcrypt = require('bcrypt');
const { getUser, setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            salt,
            password: hashedPassword
        });
        const token = setUser(user);
        res.cookie('token', token);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Wrong credentials" });
    }
    const token = setUser(user);
    res.cookie('token', token);
    return res.status(200).json({ message: "User logged in successfully" });
}

async function handleUserLogout(req, res) {
    res.clearCookie('token');
    return res.json({ message: "User logged out successfully" });
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
};