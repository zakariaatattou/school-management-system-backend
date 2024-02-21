import mongoose from 'mongoose';


export interface IClass {
    name: string,
}

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
});


const Class = mongoose.model(
    "Class",
    ClassSchema
);

export default Class;




