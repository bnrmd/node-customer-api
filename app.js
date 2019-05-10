const home = require('./routes/home')
const customers = require('./routes/customers');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/customers', customers);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on port ${port}...`));