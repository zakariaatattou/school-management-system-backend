import express, { Application } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from 'mongoose';
import { authenticate } from './controllers/auth';
import Student from "./models/student";
import Class from "./models/class";


const app: Application = express();
const port = 8000;


app.use(bodyParser.json());
app.use(cors());


// //CONNECTION TO MONGOOSE DATABASEmongoose
mongoose.connect('mongodb+srv://zak:wG7XRufDD7dHJhq1@cluster0.kvaktjm.mongodb.net/', { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log(`Running on ENV = ${process.env.NODE_ENV}`);
        console.log('Connected to mongoDB.');
    })
    .catch((error) => {
        console.log('Unable to connect.');
        console.log(error);
    });


app.get('/', (req: any, res: any) => {
    res.send('working')
});

// Login
app.post('/api/login', authenticate);


// Get Students
app.get('/api/students', async (req: any, res: any) => {
    try {
        const students = await Student.find();
        res.status(200).json(students)
    } catch (err) {
        console.log(err);
    }
});


// Register student
app.post('/api/students/register', async (req: any, res: any) => {
    const { firstName, lastName, email, age, address, dateOfBirth, gender, className } = req.body;
    try {
        const student = await Student.create({ firstName, lastName, email, age, address, dateOfBirth, gender, className });
        res.status(200).json(student)
    } catch (err) {
        console.log(err);
    }
});


// update student
app.put('/api/students/update/:id', async (req: any, res: any) => {
    const { firstName, lastName, email, age, address, dateOfBirth, gender, className } = req.body;
    const id = req.params.id;
    try {
        const student = await Student.findByIdAndUpdate(id, { firstName, lastName, email, age, address, dateOfBirth, gender, className });
        res.status(200).json(student)
    } catch (err) {
        console.log(err);
    }
});

// Delete student
app.delete('/api/students/delete/:id', async (req: any, res: any) => {
    const { id } = req.params.id;
    try {
        const student = await Student.findOneAndDelete({ id: id });
        res.status(200).json("Student was successfully removed")
    } catch (err) {
        console.log(err);
    }
});


//Get Classes 
app.get('/api/classes', async (req: any, res: any) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes)
    } catch (err) {
        console.log(err);
    }
});

// [
//     {
//         firstName: "John",
//         lastName: "Doe",
//         age: 20,
//         address: "123 Main St",
//         dateOfBirth: "2004-05-10",
//         gender: "Male",
//         class: "Class 1",
//     },
//     {
//         firstName: "Jane",
//         lastName: "Smith",
//         age: 22,
//         address: "456 Oak St",
//         dateOfBirth: "2002-03-15",
//         gender: "Female",
//         class: "Class 2",
//     },
// ].forEach(item => {
//     Student.create(item).then(res => {
//         console.log("CREATED")
//     })
// })


// INIT SERVER
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
