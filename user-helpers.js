var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
           try {
            userData.password = await bcrypt.hash(userData.Password,10); 
            //delete userData.Password;
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                    resolve(data.ops[0])
                })
           } catch (error) {
               console.log(error);
           }
        })

    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            try{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }
            else{
                console.log("login failed");
                resolve({status:false})
            }
        }catch(error){
            console.log(error);
        }
        })
    }
}