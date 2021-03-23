const express = require('express');
const bodyParser = require('body-parser');
const loginController =   require('./src/controllers/login.controller');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5002;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.post('/login', loginController.login);

const userRoutes = require('./src/routes/user.routes')
// using as middleware
app.use('/api/v1/users', userRoutes)
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});