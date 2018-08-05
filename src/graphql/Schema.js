const {
    buildSchema
} = require('graphql');

module.exports = buildSchema(`
    type Query {
        cars(page: Int = 0, perPage: Int = 10): Cars
        car(id: String!): Car
        models(page: Int = 0, perPage: Int = 10): Models
        model(id: String!): Model
        manufacturers(page: Int = 0, perPage: Int = 10): Manufacturers
        manufacturer(id: String!): Manufacturer
    }
    type Manufacturer {
        _id: String
        name: String
        detail: String
        isHide: Boolean
    }
    type Model {
        _id: String
        name: String
        detail: String
        isHide: Boolean
    }
    type Car {
        name: String
        manufacturer: [Manufacturer]
        model: [Model]
        new: Boolean
        price: Int
        detail: String
        specifications: String
        yearofmanufacture: Int
        currentKM: Int
        _id: String
    }
    type Cars {
        data: [Car]
        page: Int
        perPage: Int
        count: Int
    }
    type Models {
        data: [Model]
        page: Int
        perPage: Int
        count: Int
    }
    type Manufacturers {
        data: [Manufacturer]
        page: Int
        perPage: Int
        count: Int
    }
`)