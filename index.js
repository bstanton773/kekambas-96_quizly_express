const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const { connectDB } = require('./src/db');

dotenv.config();
const app = express();
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World')
});

// Set the view engine to ejs
app.set('view engine', 'ejs')
// Update the location of the views folder that res.render uses
app.set('views', path.join(__dirname, 'src/templates/views'))

// Need this middleware so that form data is added to request
app.use(express.urlencoded({ extended: true }))

// Initialize routes
const initRoutes = require('./src/routes');
initRoutes(app);


app.listen(process.env.PORT, () => {
    console.log(`Server is now running on port ${process.env.PORT}`)
})
