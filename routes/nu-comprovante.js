const express = require('express');
const router = express.Router();
const path = require('path');

// Rota principal para exibir o comprovante
router.get('/', (req, res) => {
    res.sendFile('nu-comprovante.html', { root: path.join(__dirname, '../views') });
});

module.exports = router; 