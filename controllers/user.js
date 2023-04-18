const { request, response } = require("express");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require("body-parser");
// const path = require("path");
// const fs = require("fs");
const md5 = require("md5");
// const user = require("../models/user");
// const user = require("../models/user");

const user = require("../models/index").user;
const Op = require("sequelize").Op;
const SECRET_KEY = "koderahasia";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

exports.login = async (request, response) => {
    try {
        const params = {
            username: request.body.username,
            password: md5(request.body.password),
        };
        const findUser = await user.findOne({ where: params });
        if (findUser == null) {
            return response.status(404).json({
                message: "nama pengguna atau kata sandi tidak cocok",
                err: "Error",
            });
        }

        //generate jwt token
        let tokenPayLoad = {
            id_user: findUser.id_user,
            username: findUser.username,
            role: findUser.role,
        };
        tokenPayLoad = JSON.stringify(tokenPayLoad);
        let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);

        return response.status(200).json({
            message: "Succes login",
            data: {
                token: token,
                id_user: findUser.id_user,
                username: findUser.username,
                role: findUser.role,
            },
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "Internal error",
            err: error,
        });
    }
};

//mendapatkan semua data dalam tabel
exports.getAlluser = async (request, response) => {
    let user_ = await user.findAll();
    return response.json({
        success: true,
        data: user_,
        message: "Semua Pengguna telah dimuat",
    });
};

//mendapatkan salah satu data dalam tabel (where clause)
exports.findUser = async (request, response) => {
    let nama_user = request.body.nama_user;

    let user_ = await user.findOne({
        where: {
            [Op.or]: [
                { nama_user: { [Op.substring]: nama_user } },
            ],
        },
    });
    return response.json({
        success: true,
        data: user_,
        message: "Pengguna telah dimuat",
    });
};

//menambah data
exports.addUser = (request, response) => {
    let newUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password),
    };

    user.create(newUser).then((result) => {
        return response.json({
            success: true,
            data: result,
            message: "Pengguna Baru telah dimasukkan",
        });
    })

        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            });
        });
};

//mengupdate salah satu data
exports.updateUser = (request, response) => {
    let id_user = request.params.id;

    let dataUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password),
    };

    user.update(dataUser, { where: { id: id_user } }).then((result) => {
        return response.json({
            success: true,
            message: "Pengguna data telah diperbarui",
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
exports.deleteUser = async (request, response) => {
    let id_user = request.params.id;

    user.destroy({ where: { id: id_user } }).then((result) => {
        return response.json({
            success: true,
            message: "pengguna data telah dihapus di mana id_user :" + id_user,
        });
    })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            });
        });
};