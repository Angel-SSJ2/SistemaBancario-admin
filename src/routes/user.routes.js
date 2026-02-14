const { Router } = require('express');
const router = Router();

// Ruta de prueba
router.get('/', (req, res) => {
    res.json({ msg: 'Ruta de usuarios funcionando' });
});

module.exports = router;
