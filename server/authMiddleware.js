const EmployeeModel = require('./models/Employee');

const isAdmin = async (req, res, next) => {
    const { userId } = req.body;

    try {
        const user = await EmployeeModel.findById(userId);
        if (user && user.usertype === 'Admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while checking admin status." });
    }
};

module.exports = isAdmin;
