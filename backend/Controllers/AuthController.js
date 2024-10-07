import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../Models/User.js';


const Signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exist, Login to continue", success: false });
        }

        const newUser = new userModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({ message: "You are Sign up Successfully", success: true });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }

}


const Login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const errorMsg = "Auth Failed email or password is wrong";
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200).json({
            message: "You are Login Successfully",
            success: true,
            jwtToken,
            email,
            name: user.name

        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }

}


export { Signup, Login };