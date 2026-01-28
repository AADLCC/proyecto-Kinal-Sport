// importamos las dependencias
import mongoose from 'mongoose';
const { Cursor } = mongoose;
import Field from './field.model.js';

// Controles 
export const getFields = async (req, res) => {
    try {
        
        // datos que vienen de la query
        const { page = 1, limit = 10, isActive } = req.query;

        // Variable que uilizaremos para el filtrar
        // Como se realiza el filtro 
        const filter = { isActive };

        // opciones de paginacion 
        const options = {
            //convertimo a numero 
            page: parseInt(page),
            // convertimos a numero 
            limit: parseInt(limit),
            // ordenar por fecha de creacion
            sort: { createAt: 1 },
        }

        // Realizar la consulta al Schema Field
        const fields = await Field.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(options.sort);

        // conteo de docuemntos de la consulta
        const total = await Field.countDocuments(filter);
        
        // respuesta
        res.status(200).json({
            success: true,
            data: fields,
            paginsation: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los campos',
            error: error.message
        });
    }
};
