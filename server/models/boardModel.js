const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Boards = new Schema({
    username: {
        type: String,
        required: true
    },
    boarddata: [{
        boardname: {
            type: String,
            required: true
        },
        todo: [{
            title: {
                type: String
            },
            description : {
                type: String
            }
        }],
        inprogress: [{
            title: {
                type: String
            },
            description : {
                type: String
            }
        }],
        done: [{
            title: {
                type: String
            },
            description : {
                type: String
            }
        }]
    }]
})

module.exports = mongoose.model('boards', Boards)