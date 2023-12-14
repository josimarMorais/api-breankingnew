import express from 'express';
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv';

import userRoute from './src/routes/user.routes.js';
import authRoute from './src/routes/auth.route.js';


dotenv.config();

const port = process.env.PORT || 3000;
const app = express();


connectDatabase();

app.use(express.json());

//ROTAS
app.use("/user", userRoute);
app.use("/auth", authRoute);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));