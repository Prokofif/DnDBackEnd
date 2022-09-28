const mongoDB = require("../Database/database");
const emptyAccaunt = {}


exports.getUsers = (req, res, next) => {

    mongoDB.findMultipleDocuments(mongoDB.client, emptyAccaunt, "DnD", "Player").then(
        (result) => {
            res.json(result)
        }
    )
}

exports.getUserByName = (req, res, next) => {


    // ObjectId = require('mongodb').ObjectID;
    // let _id = req.params.id
    // let oid = ObjectId(_id)

    let firstName = req.params.firstName


    console.log("req param bitch>>>>>>>>>> ", firstName)
    mongoDB.findDocument(mongoDB.client, { firstName: firstName }, "DnD", "Player").then(
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
                res.end('Account is taken!')
                return;
            }

            else mongoDB.createDocument(mongoDB.client, { firstName: req.body.firstName, nickName: req.body.nickName }, "DnD", "Player")
                .then(
                    (result) => {
                        result.firstName = firstName
                        console.log("RESULT: ", result)
                        res.json(result);
                    });
        }).catch((err) => {
            console.log(err)
        })
}


exports.updateUser = (req, res, next) => {

    console.log("UPDTE. NEW VALUES:",req.body)

    mongoDB.updateDocument(mongoDB.client, { firstName: req.body.firstName }, req.body, "DnD", "Player")
        .then((result) => {
            console.log("===========result===========")
            console.log(result)
        }).catch((err) => {
            console.log("===========Error===========")
            console.log(err)
        })
}


//helper
exports.checkAccount = async (firstName) => {

    return new Promise(async (resolve) => {
        if (firstName == '') return

        mongoDB.findDocument(mongoDB.client, { firstName: firstName }, "DnD", "Player").then(
            (result) => { return resolve(!(result === undefined)); }
        ).catch((err) => { console.log(err) })
    });
}