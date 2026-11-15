import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'

async function registerUser(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body

        const isUserAlreadyExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isUserAlreadyExist) {
            return res.status(409).json({
                message: "Username already exits"
            })
        }

        const hash=await bcrypt.hash(password,10)

        const user = await userModel.create({
            username,
            email,
            password:hash,
            role
        })

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            }, process.env.JWT_SECRET
        )

        res.cookie('token', token)

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.log(error.message)
    }
}

export default {registerUser}