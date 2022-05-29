exports.checkID = (req, res, next, val) => {
    const id = req.params.id


    if(id > 5) {
        console.log(`params id ${id}`);
        return res.status(404).json({
            status : 'fail',
            message :'Invalid, max id param 4'
        })
    }
    next();
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'Users not yet defined.'
    })
};
exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'Users not yet defined.'
    })
};
exports.getUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'User not yet defined.'
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'Users not yet defined'
    })
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'Users not yet defined.'
    })
};