const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee');
const isAdmin = require('./authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/yourdatabase");

app.post('/register', async (req, res) => {
    const { username, email, password, usertype, secretKey } = req.body;

    try {
        if (usertype === "Admin" && secretKey !== "Your secret Key") { 
            return res.status(400).json({ message: "Invalid Secret Key" });
        }

        const existingUser = await EmployeeModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const approved = usertype === "Admin";
        bcrypt.hash(password, 10)
        .then(hash => {
            EmployeeModel.create({username, email, usertype, password: hash, approved})
            .then(employees => res.json(employees))
            .catch(err => res.json(err))
        }).catch(err => console.log(err.message))
    } catch (err) {
        res.status(500).json({ message: "An error occurred while creating the account." });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (!user.approved) {
                return res.status(403).json({ message: "Account is awaiting approval." });
            }
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    res.json({ message: "Success", userId: user._id, usertype: user.usertype });
                } else {
                    res.json("The password is incorrect");
                }
            })
        } else {
            res.json("User not found");
        }
    });
});

app.post("/reset-password", async (req, res) => {
    const { email, password, newPassword } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "The password is incorrect" });
        }

        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        await user.save();

        res.json({ message: "Password successfully updated" });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while resetting the password." });
    }
});

app.get("/pending-users", isAdmin, async (req, res) => {
    try {
        const pendingUsers = await EmployeeModel.find({ approved: false, usertype: "User" });
        res.json(pendingUsers);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching pending users." });
    }
});

app.post("/approve-user", isAdmin, async (req, res) => {
    const { userId } = req.body;

    try {
        await EmployeeModel.findByIdAndUpdate(userId, { approved: true });
        res.json({ message: "User approved successfully." });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while approving the user." });
    }
});


    
    mongoose.connect("mongodb://127.0.0.1:27017/employee");
    
    app.post('/register', async (req, res) => {
        const { username, email, password, usertype } = req.body;
    
        try {
            const existingUser = await EmployeeModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
    
            const hash = await bcrypt.hash(password, 10);
            const user = new EmployeeModel({ username, email, usertype, password: hash, approved: usertype === "Admin" });
            await user.save();
    
            res.json({ message: "User registered successfully" });
        } catch (err) {
            res.status(500).json({ message: "An error occurred while creating the account." });
        }
    });
    
    
    app.post("/login", async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const user = await EmployeeModel.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" });
            }
    
            if (user.usertype === "User" && !user.approved) {
                return res.status(400).json({ message: "User not approved" });
            }
    
            res.json({ message: "Success", usertype: user.usertype });
        } catch (err) {
            res.status(500).json({ message: "An error occurred during login." });
        }
    });
    
    app.post("/reset-password", async (req, res) => {
        const { email, password, newPassword } = req.body;
    
        try {
            const user = await EmployeeModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" });
            }
    
            const hash = await bcrypt.hash(newPassword, 10);
            user.password = hash;
            await user.save();
    
            res.json({ message: "Password successfully updated" });
        } catch (err) {
            res.status(500).json({ message: "An error occurred while resetting the password." });
        }
    });
    
    
app.get('/users', async (req, res) => {
    try {
        const users = await EmployeeModel.find({ usertype: "User", approved: false });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching users." });
    }
});

app.put('/approve-user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await EmployeeModel.findByIdAndUpdate(id, { approved: true });
        res.json({ message: "User approved successfully" });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while approving the user." });
    }
});

app.delete('/reject-user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await EmployeeModel.findByIdAndDelete(id);
        res.json({ message: "User rejected successfully" });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while rejecting the user." });
    }
});


app.listen(3001, () => {
    console.log("server is running");
});
