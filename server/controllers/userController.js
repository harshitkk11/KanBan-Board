const User = require('../models/userModel');

const createUser = async (req, res) => {
    const {name, username, email, password} = req.body;

    try {
        const findUsername = await User.findOne({username: username})
        const findEmail = await User.findOne({email: email.toLowerCase()})

        if (!findUsername && !findEmail) {
            try {
                await User.create({name, username, email: email.toLowerCase(), password});
                res.status(200).json("notExist");
            } catch(error) {
                res.status(400).json({error: error.message})
            }    
        }

        else if (findUsername){
            res.status(200).json("username exist")
        }

        else if (findEmail){
            res.status(200).json("email exist")
        }
    } catch(error) {
        res.status(400).json({error: error.message})
    }    
    
}

const getUser = async (req, res) => {
    const {username, password} = req.body
    console.log("serverside", username,password)

    try {
        const user = await User.findOne({username: username, password: password})
        if (user){
            res.status(200).json(user)
        }
        else {
            res.status(200).json()
        }
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    createUser,
    getUser
}