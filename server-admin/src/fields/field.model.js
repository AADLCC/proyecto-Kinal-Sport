'use strict';
 
import mongoose, { mongo } from "mongoose";
import { kMaxLength } from "node:buffer";
 
const fieldSchema = new mongoose.Schema({
    fieldName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre del campo no puede tener mas de 100 caracteres'],
 
    },
    fieldType: {
        type: String,
        required: [true, 'El tipo de campo es requerido'],
        //enume: valores permitidos
        enum: {
            values: ['NATURAL', 'SINTETICA', 'CONCRETO'],
            message: 'Tipo de superficie no valida',
        },
    },
    capacity: {
        type: String,
        required: [true, 'La capacidad es requerida'],
        enume: {
            values: ['FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11'],
            message: 'Capacidad no valida',
        },
    },
    pricePerHour: {
        type: Number,
        required: [true, 'El precio por hora es requerido'],
        min: [0, 'El precio debe ser mayor o igual a 0'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripcion no puede exceder 500 caracteres'],
    },
    photo: {
        type: String,
        //valor por defecto
        default: 'fields/kinal_sports_nyvxo5',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});