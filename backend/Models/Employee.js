import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    photo: {
        type: String,
        required: false,
    }
});

const employeeModel = mongoose.model('employees', employeeSchema)
export default employeeModel;