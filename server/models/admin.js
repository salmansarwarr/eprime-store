import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    password: { type: String, require: true },
});

export default mongoose.model("Admin", adminSchema);