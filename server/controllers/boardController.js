const Boards = require('../models/boardModel')

const getBoards = async (req, res) => {
    const {username} = req.body

    try {
        const getboards = await Boards.findOne({username})
        res.status(200).json(getboards)
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

const createBoard = async (req, res) => {
    const {username, boardname, color} = req.body
    const newdata = {boardname: boardname, color: color}


    try {
        const add = await Boards.findOneAndUpdate({username}, {$push: {boarddata: newdata}})
        
        if (!add) {
            const createnew = await Boards.create({username, boarddata: [newdata]})
            return res.status(200).json(createnew)
            
        }
        return res.status(200).json(add)
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

const updateBoard = async (req, res) => {
    const {username, boardid, newname} = req.body
    // const newdata = {boardname: newname}

    try {
        const updateName = await Boards.findOneAndUpdate({
            username, 
            boarddata: {
                $elemMatch: {
                    _id: boardid
                }
            }}, {$set: {"boarddata.$.boardname": newname}})
        return res.status(200).json(updateName)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteBoard = async (req, res) => {
    const {username, boardid} = req.body

    try {
        const document = await Boards.findOne({username});
        document.boarddata.pull({ _id: boardid });
        await document.save();
        return res.status(200).json(document)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const createTodo = async (req, res) => {
    const {username, boardid, title, description} = req.body
    const todocard = {title: title, description: description}

    try {
        const addTodo = await Boards.findOneAndUpdate({
            username, 
            boarddata: {
                $elemMatch: {
                    _id: boardid
                }
            }}, {$push: {
                "boarddata.$.todo": todocard
            }})
        return res.status(200).json(addTodo)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const updateTodo = async (req, res) => {
    const {username, boardid, title, description, id} = req.body

    try {
        const user = await Boards.findOne({username});
        const board = user.boarddata.find((board) => board._id == boardid);
        const todoitem = board.todo.find((item) => item._id == id);
        todoitem.title = title;
        todoitem.description = description;
        await user.save();

        return res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteTodo = async (req, res) => {
    const {username, boardid, id} = req.body

    try {
        const user = await Boards.findOne({username});
        const board = user.boarddata.find((board) => board._id == boardid);
        board.todo.pull({ _id: id })
        await user.save();

        return res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const createInprogress = async (req, res) => {
    const {username, boardid, title, description} = req.body
    const inprogresscard = {title: title, description: description}

    try {
        const addInprogress = await Boards.findOneAndUpdate({
            username, 
            boarddata: {
                $elemMatch: {
                    _id: boardid
                }
            }}, {$push: {
                "boarddata.$.inprogress": inprogresscard
            }})
        return res.status(200).json(addInprogress)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const updateInprogress = async (req, res) => {
    const {username, boardid, title, description, id} = req.body

    try {
        const user = await Boards.findOne({username});
        const board = user.boarddata.find((board) => board._id == boardid);
        const inprogressitem = board.inprogress.find((item) => item._id == id);
        inprogressitem.title = title;
        inprogressitem.description = description;
        await user.save();

        return res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteInprogress = async (req, res) => {
    const {username, boardid, id} = req.body

    try {
        const user = await Boards.findOne({username});
        const board = user.boarddata.find((board) => board._id == boardid);
        board.inprogress.pull({ _id: id })
        await user.save();

        return res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const createDone = async (req, res) => {
    const {username, boardid, title, description} = req.body
    const donecard = {title: title, description: description}

    try {
        const addDone = await Boards.findOneAndUpdate({
            username, 
            boarddata: {
                $elemMatch: {
                    _id: boardid
                }
            }}, {$push: {
                "boarddata.$.done": donecard
            }})
        return res.status(200).json(addDone)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const updateDone = async (req, res) => {
    const {username, boardid, title, description, id} = req.body

    try {
        const user = await Boards.findOne({username});
        const board = user.boarddata.find((board) => board._id == boardid);
        const doneitem = board.done.find((item) => item._id == id);
        doneitem.title = title;
        doneitem.description = description;
        await user.save();

        return res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteDone = async (req, res) => {
    const {username, boardid, id} = req.body

    try {
        const user = await Boards.findOne({username});
        const board = user.boarddata.find((board) => board._id == boardid);
        board.done.pull({ _id: id })
        await user.save();

        return res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createBoard,
    updateBoard,
    deleteBoard,
    getBoards, 
    createTodo,
    updateTodo,
    deleteTodo,
    createInprogress,
    updateInprogress,
    deleteInprogress,
    createDone,
    updateDone,
    deleteDone
}