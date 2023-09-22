import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String },
    healthProblems: [{
        name: String,
        degree: String
    }],
    created_at: { type: Date, required: false },
    updated_at: { type: Date, required: false },
}, {
    timestamps: true
})

const Client = mongoose.model('Client', ClientSchema)

export default Client

