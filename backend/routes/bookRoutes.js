const express = require('express');
const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get all books
router.get('/', getAllBooks);

// Route to create a new book (Admin only)
router.post('/', verifyToken, createBook);

// Route to update a book (Admin only)
router.put('/:id', verifyToken, updateBook);

// Route to delete a book (Admin only)
router.delete('/:id', verifyToken, deleteBook);

module.exports = router;
