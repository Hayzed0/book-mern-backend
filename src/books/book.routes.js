const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updateBookData, deleteBook } = require('./bookController');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();


router.post('/create-book', verifyAdminToken, postABook)

// get book router 

router.get('/', getAllBooks)

router.get('/:id', getSingleBook)

// Update a b00k

router.put('/edit/:id', verifyAdminToken, updateBookData)

router.delete('/:id', verifyAdminToken, deleteBook)

module.exports = router;