const Book = require('../models/bookModel');

// Create a new book (เพิ่มหนังสือใหม่)
const createBook = async (req, res) => {
    try {
        const { title, author, description, image } = req.body;

        // สร้างหนังสือใหม่โดยใช้ข้อมูลจาก request body
        const newBook = new Book({
            title,
            author,
            description,
            image
        });

        await newBook.save(); // บันทึกลงฐานข้อมูล
        res.status(201).json(newBook); // ส่งข้อมูลหนังสือใหม่กลับไปยัง client
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มหนังสือ', error });
    }
};

// Get all books (ดึงรายการหนังสือทั้งหมด)
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); // ดึงข้อมูลหนังสือทั้งหมดจากฐานข้อมูล
        res.status(200).json(books); // ส่งข้อมูลกลับไปยัง client
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ', error });
    }
};

// Get a single book by ID (ดึงรายละเอียดหนังสือตามไอดี)
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // ค้นหาหนังสือตามไอดีจาก URL parameter

        if (!book) {
            return res.status(404).json({ message: 'ไม่พบหนังสือที่ต้องการ' });
        }

        res.status(200).json(book); // ส่งข้อมูลหนังสือที่พบกลับไปยัง client
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงรายละเอียดหนังสือ', error });
    }
};

// Update a book by ID (แก้ไขหนังสือตามไอดี)
const updateBook = async (req, res) => {
    try {
        const { title, author, description, image } = req.body;

        // ค้นหาและอัปเดตหนังสือตามไอดี
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
            title,
            author,
            description,
            image
        }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'ไม่พบหนังสือที่ต้องการแก้ไข' });
        }

        res.status(200).json(updatedBook); // ส่งข้อมูลหนังสือที่อัปเดตกลับไปยัง client
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการแก้ไขหนังสือ', error });
    }
};

// Delete a book by ID (ลบหนังสือตามไอดี)
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id); // ลบหนังสือตามไอดี

        if (!book) {
            return res.status(404).json({ message: 'ไม่พบหนังสือที่ต้องการลบ' });
        }

        res.status(200).json({ message: 'ลบหนังสือสำเร็จ' });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบหนังสือ', error });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
