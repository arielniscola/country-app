const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoutes = require('./country.route')
const activityRoutes = require('./touristActivity.route');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countryRoutes);
router.use('/activities', activityRoutes)


module.exports = router;
