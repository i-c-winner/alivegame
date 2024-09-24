import express = require('express');
import * as cors from 'cors'
import automatonRoutes from "./routes/automatonRoutes";

const app = express();
app.use(cors())

app.use(express.json());
app.use("/api", automatonRoutes);

export default app;
