var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
           try {
            userData.password = await bcrypt.hash(userData['Password'], 10, function (err, hash) {
                console.log('data', userData['Password']);
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                    resolve(data.ops[0])
                })

            })
           } catch (error) {
               console.log(error);
           }
        })

    }
}