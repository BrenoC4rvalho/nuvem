import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import userApiRoutes from './routes/userApi';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use('/user', userApiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`project on port ${process.env.PORT}`);
});