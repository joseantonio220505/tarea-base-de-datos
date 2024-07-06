const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Index - Listar todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.render('index', { books });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// New - Formulario para nuevo libro
router.get('/new', (req, res) => {
  res.render('new');
});

// Create - Crear un nuevo libro
router.post('/', async (req, res) => {
  try {
    await Book.create(req.body.book);
    res.redirect('/books');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show - Mostrar un libro
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('show', { book });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Edit - Formulario para editar libro
router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('edit', { book });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update - Actualizar libro
router.put('/:id', async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body.book);
    res.redirect(`/books/${req.params.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete - Eliminar libro
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;