const mongo = require('mongodb');
const config = require('../config/index.json');
module.exports = {
    getManufacturers: (page = 0, perPage = 10) => {
        return new Promise((resolve, reject) => {
            mongo.connect(config.mongoUri, (err, client) => {
                if (err) return reject(err);
                let db = client.db('newDB');
                db.collection("manufacturers").aggregate([{
                    $sort: {
                        "name": 1
                    }
                }, {
                    $skip: page * perPage
                }, {
                    $limit: perPage
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
                return db.collection("manufacturers").find({}).count().then(res => {
                    return resolve(res);
                })
            })
        });
    }
}