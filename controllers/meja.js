const { request, response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
// const path = require("path");
// const fs = require("fs");
// const { sequelize } = require("../models/index");

const meja = require("../models/index").meja;
const Op = require("sequelize").Op;

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//mendapatkan semua data dalam tabel
exports.getAllMeja = async (request, response) => {
    let meja_ = await meja.findAll();
    return response.json({
        success: true,
        data: meja_,
        message: "Semua tabel telah dimuat",
    });
};

//mendapatkan salah satu data dalam tabel (where clause)
exports.findMeja = async (request, response) => {
    let nomor_meja = request.body.nomor_meja;

    let meja_ = await meja.findOne({
        where: {
            [Op.and]: [{ nomor_meja: { [Op.substring]: nomor_meja } }],
        },
    });
    return response.json({
        success: true,
        data: meja_,
        message: "Semua Tabel telah dimuat",
    });
};

//menambah data
exports.addMeja = async (request, response) => {
    let newMeja = {
        nomor_meja: request.body.nomor_meja,
        status_meja: request.body.status_meja,
    };
    meja.create(newMeja).then((result) => {
        try{
            return response.json({
                success: true,
                data: result,
                message: "Meja baru telah ditambahkan",
            });
        } catch (err) {
            return response.json({
                success: false,
                message: error.message,
            });
        }
    });
};

//mengupdate salah satu data
exports.updateMeja = async (request, response) => {
    let dataMeja = {
        nomor_meja: request.body.nomor_meja,
        status_meja: request.body.status_meja,
    };
    let id_meja = request.params.id;
    meja.update(dataMeja, { where: { id: id_meja } }).then((result) => {
        return response.json({
            success: true,
            message: "Tabel data telah diperbarui",
        });
    })
    .catch((error) => {
        return response.json({
            success: false,
            message: error.message,
        });
    });
};

//menghapus salah satu data
exports.deleteMeja = (request, response) => {
    let id_meja = request.params.id;

    meja.destroy({ where: { id: id_meja } }).then((result) => {
        return response.json({
            success: true,
            message: "tabel data telah dihapus",
        });
    })
    .catch((error) => {
        return response.json({
            success: false,
            message: error.message,
        });
    });
};

exports.availableTable = async (request, response) => {
    const tgl_transaksi = request.body.tgl_transaksi;

    const result = await sequelize.query(
        `SELECT meja.nomor_meja FROM meja LEFT JOIN menu ON meja.id_meja = menu.id_menu LEFT JOIN transaksi ON transaksi.id_meja = meja.id_meja WHERE meja.id_meja NOT IN (SELECT id_meja from transaksi WHERE tgl_transaksi BETWEEN '${tgl_transaksi}')`
    );

    return response.json({
        success: true,
        sisa_meja: result[0].length,
        data: result[0],
        message: "Tabel yang tersedia telah dimuat",
    });
};