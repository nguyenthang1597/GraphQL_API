const mongo = require('mongodb');
const config = require('../config/index.json');
module.exports = {
    getModels: (page = 0, perPage = 10) => {
        return new Promise((resolve, reject) => {
            mongo.connect(config.mongoUri, (err, client) => {
                if (err) return reject(err);
                let db = client.db('newDB');
                db.collection("models").aggregate([{
                    $sort: {
                        "name": 1
                    }
                }, {
                    $skip: page * perPage
                }, {
                    $limit: perPage
                }], (err, res) => {
                    if (err) reject(err);
                    else resolve(res.toArray());
                })
            })
        });
    },
    count: () => {
        return new Promise((resolve, reject) => {
            mongo.connect(config.mongoUri, (err, client) => {
                if (err) return reject(err);
                let db = client.db("newDB");
                return db.collection("models").find({}).count().then(res => {
                    return resolve(res);
                })
            })
        });
    }
}