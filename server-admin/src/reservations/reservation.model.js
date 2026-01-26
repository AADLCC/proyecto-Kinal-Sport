'use strict';
import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema({
    reservationDate: {
        type: Date,
        required: [true, 'La fecha de la reservacion es requerida'],
    },
    startTime: {
        type: String,
        required: [true, 'La hora de inicio es requerida'],
    },
    endTime: {
        type: String,
        required: [true, 'La hora de fin es requerida'],
    },
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: [true, 'El campo es requerido'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'El precio total es requerido'],
        min: [0, 'El precio total debe ser mayor o igual a 0'],
    },
    status: {
        type: String,
        required: [true, 'El estado de la reservacion es requerido'],
        enum: {
            values: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'],
            message: 'Estado de reservacion no valido',
        },
        default: 'PENDIENTE',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Reservation = mongoose.model('Reservation', reservationSchema);
export { Reservation };
reservationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
