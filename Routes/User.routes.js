const express = require("express")
const { UserModel } = require("../Model/User.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { name, email, pass, age } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            // Store hash in your password DB.
            const user = new UserModel({ name, email, pass: hash, age })
            await user.save()
            res.status(200).send({ "msg": "new user added" })
        });

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                // result == true
                if (result) {
                    const token = jwt.sign({authorID:user._id,author:user.name}, 'masai');
                    res.status(200).send({ "msg": "Login successfull", "token": token })
                }else{
                    res.status(200).send({ "msg": "wrong credentials" })
                }
            });

        } else {
            res.status(200).send({ "msg": "wrong credentials" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


module.exports = {
    userRouter
}