const menuModel = require("../models/index").menu
const transaksiModel = require("../models/index").transaksi
const detailTransaksiModel = require("../models/index").detail_transaksi
const moment = require("moment")

const Op = require("sequelize").Op

//menambah data
exports.addTransaksi = async (request, response) => {
    let newData = {
        tgl_transaksi: moment().format('YYYY-MM-DD HH:mm:ss'),
        nama_pelanggan: request.body.nama_pelanggan,
        id_meja: request.body.id_meja,
        status: request.body.status,
        id_user: request.body.id_user,
    }

    transaksiModel.create(newData).then(result => {
        let total_bayar = 0;
        let id_transaksi = result.id

        let detail_transaksi = request.body.detail_transaksi

        for (let i = 0; i < detail_transaksi.length; i++) {
            detail_transaksi[i].id_transaksi = id_transaksi;
            total_bayar += detail_transaksi[i].harga * detail_transaksi[i].qty;
        }

        newData = { ...newData, total_bayar: total_bayar };

        detailTransaksiModel.bulkCreate(detail_transaksi).then(result => {
            return response.json({
                success: true,
                message: "Transaksi baru telah dimasukkan"
            })
        })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

//mengupdate data
exports.updateTransaksi = async (request, response) => {
    let newData = {
        tgl_transaksi: moment().format('YYYY-MM-DD HH:mm:ss'),
        nama_pelanggan: request.body.nama_pelanggan,
        id_meja: request.body.id_meja,
        status: request.body.status,
        id_user: request.body.id_user,
    }

    let id_transaksi = request.params.id

    transaksiModel.update(newData, { where: { id: id_transaksi } }).then(async result => {
        await detailTransaksiModel.destroy(
            { where: { id_transaksi: id_transaksi } }
        )

        let detail_transaksi = request.body.detail_transaksi

        for (let i = 0; i < detail_transaksi.length; i++) {
            detail_transaksi[i].id_transaksi = id_transaksi
        }

        detailTransaksiModel.bulkCreate(detail_transaksi).then(result => {
            return response.json({
                success: true,
                message: "transaksi telah diperbarui"
            })
        })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

//menghapus data
exports.deleteTransaksi = async (request, response) => {
    let id_transaksi = request.params.id

    detailTransaksiModel.destroy(
        { where: { id_transaksi: id_transaksi } }
    )
        .then(result => {
            transaksiModel.destroy({ where: { id: id_transaksi } }).then(result => {
                return response.json({
                    success: true,
                    message: "Transaksi telah dihapus"
                })
            })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

//mendapatkan semua data
exports.getAllTransaksi = async (request, response) => {
    let data = await transaksiModel.findAll(
        {
            attributes: ['id','tgl_transaksi','id_user','id_meja','nama_pelanggan','status'],
            include: [
                { model: detailTransaksiModel, attributes: ['id_menu'], as: `detail_transaksi` },
                { model: detailTransaksiModel, attributes: ['qty'], as: `detail_transaksi` },
                { model: detailTransaksiModel, attributes: ['harga'], as: `detail_transaksi` }
              ]
        }
    );

    return response.json({
        success: true,
        data: data,
        message: "Semua Transaksi telah dimuat"
    })
}

//mendapatkan salah satu data
exports.findTransaksi = async (request, response) => {
    let status = request.body.status;

    const result = await transaksiModel.findAll({
        attributes: ['id','tgl_transaksi','id_user','id_meja','nama_pelanggan','status'],
        include: [
            { model: detailTransaksiModel, attributes: ['id_menu'], as: `detail_transaksi` },
            { model: detailTransaksiModel, attributes: ['qty'], as: `detail_transaksi` },
            { model: detailTransaksiModel, attributes: ['harga'], as: `detail_transaksi` }
          ],
        where: {
            [Op.and]: [{ status: status }],
        },
    });

    return response.json({
        success: true,
        data: result,
        message: "Transaksi telah dimuat",
    });
};