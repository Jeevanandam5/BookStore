import { User } from "../Models/userSchema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const signUpuser = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        const existingUserName = await User.findOne({ userName: userName })
        if (existingUserName) {
            return res.status(400).json({
                message: "UserName already existing"
            })
        }
        const existingEmail = await User.findOne({ email: email })
        if (existingEmail) {
            return res.status(400).json({
                message: "email already existing"
            })
        }
        if (String(password).length < 5) {
            return res.status(400).json({
                message: "Passward More then 5 character"
            })
        }

        const hasedPassword = await bcrypt.hash(String(password), 10)
        const newUser = new User({
            userName,
            email,
            password: hasedPassword
        })
        await newUser.save()
        return res.status(200).json({
            message: "User SigUp Successfully", user: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error', error: error.message
        })
    }
}

const signInUser = async (req, res) => {
    try {
        const { userName, password } = req.body

        const existingUser = await User.findOne({ userName })
        if (!existingUser) {
            res.status(400).json({
                message: 'User not found'
            })
        }

        await bcrypt.compare(password.toString(), existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name: existingUser.userName },
                    { role: existingUser.role }
                ]
                const token = jwt.sign({ authClaims }, 'Bookstore1231221',
                    {
                        expiresIn: "30d"
                    })
                res.status(200).json({
                    id: existingUser._id,
                    role: existingUser.role,
                    token: token,
                })
            } else {
                return res.status(400).json({
                    message: "Invalid password"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error', error: error.message
        })
    }
}

const getUserInfo = async (req, res) => {
    try {
        const { id } = req.headers
        const user = await User.findById(id).select("-password")
        return res.status(200).json({
            message: "user", userID: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error', error: error.message
        })
    }
}

const updateuser = async (req, res) => {
    try {
        const { id } = req.headers;
        const { userName } = req.body

        await User.findByIdAndUpdate(id, { userName }, { new: true })
        return res.status(200).json({
            message: "Updated user Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error', error: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const { id } = req.headers;

        const admin = await User.findById(id);
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ message: "Admin access only" });
        }

        const users = await User.find().select("-password");

        return res.status(200).json({
            count: users.length,
            users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export { signUpuser, signInUser, getUserInfo, updateuser,getAllUsers }