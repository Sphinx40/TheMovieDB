const express = require('express');
const bodyParser = require('body-parser');
const SignUpRouter = require('./router-sign-up');
const SignInRouter = require('./router-sign-in')
const router = require('./router-app');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', SignUpRouter)
app.use('/api', SignInRouter)
app.use('/api', router)

app.listen(5000, () => console.log('Project is working'))