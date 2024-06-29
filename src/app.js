import express from "express";
import config from "./config";
import cors from "cors";
import path from "path";
import preguntasRoutes from "../src/routes/preguntas.routes";

const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

let port;

// Configuración del puerto
app.set('port', port || config.port);

// Middlewares
app.use(upload.single('Imagen'));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(preguntasRoutes)


export default app;
