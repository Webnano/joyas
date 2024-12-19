const express = require('express');
const path = require('path');
const jewelryRoutes = require('./routes/jewelryRoutes');
const app = express();
const port = 3000;

// Middleware para generar informes
app.use((req, res, next) => {
    console.log(`Consulta realizada a la ruta: ${req.path}`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', jewelryRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
