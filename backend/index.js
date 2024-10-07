import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './Models/db.js';
import AuthRouter from './Routes/AuthRouter.js';
import EmployeeRouter from './Routes/EmployeeRouter.js';

const app = express();
dotenv.config();


const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/employees', EmployeeRouter);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});