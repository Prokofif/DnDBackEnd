const mongoDB = require("../Database/database");
const emptyAccaunt = {}


exports.getUsers = (req, res, next) => {
    
    mongoDB.findMultipleDocuments(mongoDB.client, emptyAccaunt, "DnD", "Player").then(
        (result) => {
            res.json(result)
        }
    )
}

exports.getUserById = (req, res, next) => { //todo

    let _id = req.body._id;
    console.log("body ID bitch>>>>>>>>>> "+req.body._id)
    mongoDB.findDocument(mongoDB.client,  { _id: _id }, "DnD", "Player").then(
        (result) => {
            res.json(result)
        }
    )

}

exports.deleteUsers = (req, res, next) => {
    mongoDB.deleteMultipleDocuments(mongoDB.client, emptyAccaunt, "DnD", "Player").then(
        (result) => {
            res.json(result)
        }
    )
}

 
exports.createUser = (req, res, next) => {

    let firstName = req.body.firstName;
    
    this.checkAccount(firstName).then(
        (result) => {
            if (result) {
                res.end({ acknowledged: false })
                return;
            }

            else mongoDB.createDocument(mongoDB.client, { firstName: req.body.firstName, nickName: req.body.nickName }, "DnD", "Player")
            .then(
                (result) => {
                    res.json(result);
                });
        })
}


//helper
exports.checkAccount = async (firstName) => {
    
    return new Promise(async (resolve) => {
        if (firstName == '') return
        
        mongoDB.findDocument(mongoDB.client, { firstName: firstName }, "DnD", "Player").then(
            (result) => { return resolve(!(result === undefined)); }
        )
    });
}