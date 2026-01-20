exports.getUserProfile = (req, res) => {
    res.json({
        message: 'User profile',
        user: req.user,
    });
};
