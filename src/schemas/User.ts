import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(\w|-)+@\w+(\.[a-zA-Z]+)+$/i,
        minlength: 5,
        maxlength: 35
    },
    avatar: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: Boolean,
    confirmHash: String,
    lastSeen: Date
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema);