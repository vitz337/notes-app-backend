// import mongoose, bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//user schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//hashing
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    //try to shovel
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(err) {
        next(err);
    }
});

//compare
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//export
module.exports = mongoose.model('User', userSchema);