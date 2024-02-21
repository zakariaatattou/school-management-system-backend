import mongoose from 'mongoose';


export interface IStudent {
    firstName: string,
    lastName: string,
    age: number,
    address: string,
    dateOfBirth: string,
    gender: string,
    className: string,
}

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    age: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    dateOfBirth: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    className: {
        type: String,
        require: true,
    },
});


const Student = mongoose.model(
    "Student",
    StudentSchema
);

export default Student;




