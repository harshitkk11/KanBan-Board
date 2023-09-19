const express = require('express');

const { 
    createBoard,
    getBoards,
    createTodo,
    createInprogress,
    createDone,
    updateBoard,
    deleteBoard,
    updateTodo,
    updateInprogress,
    updateDone,
    deleteTodo,
    deleteInprogress,
    deleteDone} = require('../controllers/boardController')

const router = express.Router()

router.post('/createboard', createBoard)
router.post('/getboards', getBoards)
router.post('/updateboard', updateBoard)
router.post('/deleteboard', deleteBoard);
router.post('/createtodo', createTodo)
router.post('/updatetodo', updateTodo)
router.post('/deletetodo', deleteTodo)
router.post('/createinprogress', createInprogress)
router.post('/updateinprogress', updateInprogress)
router.post('/deleteinprogress', deleteInprogress)
router.post('/createdone', createDone)
router.post('/updatedone', updateDone)
router.post('/deletedone', deleteDone)

module.exports = router;