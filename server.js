'use strict';

const path = require('path');
const app = require('./app.js');
const PORT = 3001;

app.listen(PORT, () => console.log('Server running on port',PORT));
