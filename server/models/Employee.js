const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    usertype: String,
    approved: { type: Boolean, default: false }
})

const EmployeeModel = mongoose.model("yourdatabase", EmployeeSchema)
module.exports = EmployeeModel