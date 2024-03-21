const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middleware/auth")
const verifyRole = require("../middleware/role")
const { validateBodyParams } = require("../middleware/ErrorHandler");

const router = express.Router()

router
    // get all users
    .get("/", async(req, res, next) => {
        const users = await User.find()
        res.status(200).send(users)
    })

router.get('/user', async(req, res, next) => {
    const { email } = req.query
    console.log(email)
    if(!email) {
        return res.status(400).send({Error: "Please provide an email"})
    }
    const user = await User.findOne({ email: email })
        // .select("-password - role -userType")
    if(!user) {
        return res.status(400).send({ Error: "No account found" })
    } else {
        return res.status(200).send(user)
    }
})


router
    .route("/:id")

    // get user by ID
    .get(verifyToken, async(req, res, next) => {
        const { id } = req.params
        const user = await User.findById(id)
            .select("-password -role -userType")

        if(user._id.toString() !== req.user.user_id.toString()) {
            return res.status(403).json({ error: "Forbidden."})
        }

        res.status(200).json(user)
    })

    // Update user information
    .put(async (req, res, next) => {
        const { name, email, password, role } = req.body
        const { id } = req.params
        
        try {
            const user = await User.findByIdAndUpdate(id, {
                name, 
                email,
                password,
                role
            })

            return res.status(200).send(user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    // Deletes a user....cannot delete main admin account
    .delete(async (req, res, next) => {
        const { id } = req.params

        if(!id) {
            return res.status(500).send({ error: "Error processing your request" })
        }

        try {
            const user = await User.findById(id)
            if(user.email === "admin@gmail.com") {
                return res.status(401).send({ error: "Cannot delete Admin" })
            }

            await User.findByIdAndDelete(id)
            return res.status(200).send({ success: "User deleted" })
        } catch (error) {
            next(error)
        }
    })

router.patch('/forgotpassword', async (req, res, next) => {
    const { email, newPassword, securityAnswer } = req.body
    if(!(newPassword || securityAnswer)) {
        return res.status(400).send({ Error: "Please fill out all fields" })
    }

    const confirmUser = await User.findOne({ email: email })
    let encryptedPassword = await bcrypt.hash(newPassword, 10)
    if(confirmUser && (confirmUser.securityAnswer.toLowerCase() === securityAnswer.toLowerCase())) {
        const user = await User.findByIdAndUpdate(confirmUser._id, {
            password: encryptedPassword
        })
        user.save()
        res.status(200).send(user)
    } else {
        return res.status(401).json({ Error: "Incorrect Security Answer" })
    }
})


// Login endpoint for already established users
router.post("/login", validateBodyParams("email", "password"), async (req, res, next) => {
    const { email, password } = req.body

    try {
        const checkExistingUser = await User.findOne({ email })

        if(!checkExistingUser) {
            return res.status(404).send({ error: "User account not found" })
        }

        //Check that entered password matches users password
        if( await bcrypt.compare(password, checkExistingUser.password)) {
            //If passwords match, signs jwt token with user info and returns the user and the users token
            const token = jwt.sign(
                {
                    user_id: checkExistingUser._id,
                    email,
                    role: checkExistingUser.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )

            const user = await User.findById({_id: checkExistingUser._id})
                .select("-password") //sends back the user information minus the password

            user.token = token
            return res.status(200).send({ user: user, token: user.token })
        } else {
            return res.status(422).send({ error: "Email or Password do not match" })
        }
    } catch (error) {
        next(error)
    }
})

// Register endpoint for creating a new user
router.post("/register", async (req, res, next) => {
    const { name, email, securityQuestion, securityAnswer, password } = req.body
    console.log(name)
    try {
        const checkForUser = await User.findOne({ email }) //checks for existing user

        if(checkForUser) {
            return res.status(409).send({ error: "A user already exists with that email."})
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)

            let newUser = await User.create({
                name,
                email,
                securityQuestion,
                securityAnswer,
                password: hashedPassword,
            }) 

            newUser = newUser.toJSON()
            delete newUser.password

            return res.status(201).send(newUser)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router