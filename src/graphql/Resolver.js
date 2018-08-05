const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const CAR = require('../model/Car');
const MODEL = require('../model/CarModel');
const MANUFACTURER = require('../model/Manufacturer');


module.exports = {
    cars: (params) => {
        let page = (!params.page || params.page < 1) ? 0 : params.page;
        let perPage = (!params.perPage || params.perPage < 1) ? 1 : params.perPage
        return Promise.all([CAR.getCars(page, perPage), CAR.count()])
            .then(value => {
                let res = {
                    page: page,
                    perPage: perPage,
                    count: value[1],
                    data: value[0]
                }
                return res;
            })
            .catch(err => {
                return [];
            })
    },
    car: (params) => {
        return CAR.getCarById(params.id).then(res => {
                return res;
            })
            .catch(err => {
                return [];
            })
    },
    models: (params) => {
        let page = (!params.page || params.page < 1) ? 0 : params.page;
        let perPage = (!params.perPage || params.perPage < 1) ? 1 : params.perPage
        return Promise.all([MODEL.getModels(page, perPage), MODEL.count()])
            .then(value => {
                let res = {
                    page: page,
                    perPage: perPage,
                    count: value[1],
                    data: value[0]
                }
                return res;
            })
            .catch(err => {
                return [];
            })
    },
    manufacturers: (params) => {
        let page = (!params.page || params.page < 1) ? 0 : params.page;
        let perPage = (!params.perPage || params.perPage < 1) ? 1 : params.perPage
        return Promise.all([MANUFACTURER.getManufacturers(page, perPage), MANUFACTURER.count()])
            .then(value => {
                let res = {
                    page: page,
                    perPage: perPage,
                    count: value[1],
                    data: value[0]
                }
                return res;
            })
            .catch(err => {
                return [];
            })
    }
}