const car = require('./src/model/Car');

car.getCarById('5b57e5deaaf4d80c2106537e')
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
})