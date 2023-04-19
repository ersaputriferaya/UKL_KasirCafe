const { request, response } = require("express");
const express = require("express");
const path = require("path");
const fs = require("fs");

const menu = require("../models/index").menu;
const Op = require("sequelize").Op;
const upload = require("./uploadMenu").single("gambar");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mendapatkan semua data dalam tabel
exports.getAllMenu = async (request, response) => {
    let menu_ = await menu.findAll();
    return response.json({
        success: true,
        data: menu_,
        message: "Semua menu telah dimuat",
    });
};

//mendapatkan salah satu data dalam tabel (where clause)
exports.findMenu = async (request, response) => {
    let keyword = request.body.keyword;
    let menu_ = await menu.findOne({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: keyword } },
                { jenis: { [Op.substring]: keyword } },
                { deskripsi: { [Op.substring]: keyword } },
                { harga: { [Op.substring]: keyword } },
                { stok: { [Op.substring]: keyword } },
            ],
        },
    });
    return response.json({
        success: true,
        data: menu_,
        message: "Semua menu telah dimuat",
    });
};

//menambah data
exports.addMenu = (request, response) => {
    upload(request, response, async (error) => {
        if (error) {
            return response.json({ message: error });
        }

        if (!request.file) {
            return response.json({ message: "Tidak ada yang perlu diunggah" });
        }

        let newMenu = {
            nama_menu : request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            gambar: request.file.filename,
            harga: request.body.harga,
            stok: request.body.stok,
        };

        console.log(newMenu);

        menu.create(newMenu).then((result) => {
            return response.json({
                success: true,
                data: result,
                message: "Menu Baru telah dimasukkan",
            });
        })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            });
        });
    });
};

//mengupdate salah satu data
exports.updateMenu = (request, response) => {
    upload(request, response, async (error) => {
        if (error) {
            return response.json({ message: error });
        }

        let id_menu = request.params.id;

        let dataMenu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            gambar: request.file.filename,
            harga: request.body.harga,
            stok: request.body.stok,
        };

        if (request.file) {
            const selectedMenu = await menu.findOne({
                where: { id: id_menu },
            });

            const oldGambarMenu = selectedMenu.gambar;
            const patchGambar = path.join(__dirname, `../gambar`, oldGambarMenu);

            if (fs.existsSync(patchGambar)) {
                fs.unlink(patchGambar, (error) => console.log(error));
            }
            dataMenu.gambar = request.file.filename;
        }

        menu.update(dataMenu, { where: { id: id_menu } }).then((result) => {
            return response.json({
                success: true,
                message: "Data menu telah diperbarui",
            });
        })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            });
        });
    });
};

//menghapus salah satu data
exports.deleteMenu = (request, response) => {
    let id_menu = request.params.id;

    menu.destroy({ where: { id: id_menu } }).then((result) => {
        return response.json({
            success: true,
            message: "data menu telah dihapus",
        });
    })
    .catch((error) => {
        return response.json({
            success: false,
            message: error.message,
        });
    });
};