'use strict';

import express from 'express'; 
import cors from 'cors';
import morgan from 'morgan';
import { corsOption } from './cors-configuration.js'; // 1. Agregado .js

const BASE_URL = '/kinalSportAdmin/v1'; 

const middleware = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' })); // Corregido 'extended'
    app.use(express.json({ limit: '10mb' })); 
    app.use(cors(corsOption)); 
    app.use(morgan('dev')); 
}

// 2. Agregado 'export' y quitado el parámetro 'app'
export const initServer = async () => { 
    const app = express(); 
    const PORT = process.env.PORT || 3001; 

    try {
        middleware(app); 

        // Primera ruta (dentro del try para asegurar que el server esté listo)
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'KinalSport Admin',
                version: '1.0.0'
            });
        });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

    } catch(error){
        console.log(error);
    }
}