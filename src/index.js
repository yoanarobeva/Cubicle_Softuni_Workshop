const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandlerMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const setupViewEngine = require('./config/viewEngine');
const initDatabase = require('./config/databaseInit');

const app = express();
setupViewEngine(app);

app.use(express.static('src/static'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware.authentication);
app.use(routes);
app.use(errorHandler);

initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`)))
    .catch((err) => console.error(err));
