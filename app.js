const express = require('express')

const bodyParser = require('body-parser')

const methodOverride = require('method-override');

const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/Prueba')


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Rutas
const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.redirect('/books');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});