import mongoose, {Schema} from 'mongoose';

const MessageSchema = new Schema({
    author: String,
    partner: String,
    text: String,
    dialog: String,
    unread: Boolean
}, {
    timestamps: true
});

export default mongoose.model('Message', MessageSchema);

