const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    }
});

userSchema.pre('save', async function(next) {
    //비밀번호 암호화
    let user = this;

    if(user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }

    next();
});

userSchema.methods.comparePassword = async function(plainPassword) {
    //비밀번호 비교
    let user = this;
    return bcrypt.compare(plainPassword, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;