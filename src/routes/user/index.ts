const express = require('express');
import auth from './auth';
import user from './user';

const app = express();

app.use('/auth', auth); // api/user/auth
app.use('/', user); // api/user

export default app;
