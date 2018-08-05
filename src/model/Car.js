const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const config = require('../config/index.json');
module.exports = {
    getCars: (page = 0, perPage = 10) => {
        return new Promise((resolve, reject) => {
            mongo.connect(config.mongoUri, (err, client) => {
                if (err) return reject(err);
                let db = client.db('newDB');
                db.collection("cars").aggregate([{
                    $skip: page * perPage
                }, {
                    $limit: perPage
                }, {
                    $lookup: {
                        from: 'manufacturers',
                        localField: 'manufacturerId',
                        foreignField: '_id',
                        as: 'manufacturer'
                    }
                }, {
                    $lookup: {
                        from: 'models',
                        localField: 'modelId',
                        foreignField: '_id',
                        as: 'model'
                    }
                }, {
                    $project: {
                        name: true,
                        manufacturer: true,
                        model: true,
                        new: true,
                        price: true,
                        detail: true,
                        specifications: true,
                        yearofmanufacture: true,
                        currentKM: true
                    }
                }, {
                    $sort: {
                        "name": 1
                    }
                }], async (err, res) => {
                    if (err) return reject(err);
                    let array = res.toArray();
                    client.close();
                    return resolve(array);
                })
            })
        });
    },
    count: () => {
        return new Promise((resolve, reject) => {
            mongo.connect(config.mongoUri, (err, client) => {
                if (err) return reject(err);
                let db = client.db("newDB");
                return db.collection("cars").find({}).count().then(res => {
                    client.close();
                    return resolve(res);
                })
            })
        });
    },
    getCarById: (id) => {
        return new Promise((resolve, reject) => {
            mongo.connect(config.mongoUri, (err, client) => {
                if (err) {
                    console.log('error when connect');
                    return reject(err);
                }
                let db = client.db('newDB');
                return db.collection("cars").aggregate([{
                    $match: {
                        "_id": ObjectId(id)
                    }
                }, {
                    $lookup: {
                        from: 'manufacturers',
                        localField: 'manufacturerId',
                        foreignField: '_id',
                        as: 'manufacturer'
                    }
                }, {
                    $lookup: {
                        from: 'models',
                        localField: 'modelId',
                        foreignField: '_id',
                        as: 'model'
                    }
                }, {
                    $project: {
                        name: true,
                        manufacturer: true,
                        model: true,
                        new: true,
                        price: true,
                        detail: true,
                        specifications: true,
                        yearofmanufacture: true,
                        currentKM: true
                    }
                }], async (err, res) => {
                    if (err) return reject(err);
                    let array = await res.toArray();
                    client.close();
                    return resolve(array[0]);
                });
            })
        });
    }
}