const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const salt = bcrypt.genSaltSync(10);

mongoose.connect('mongodb://localhost/customer-playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: { type: Date, default: Date.now },
    accountIds: [ String ]
});

const Customer = mongoose.model('Customer', customerSchema);

async function createCustomer(c) {
    const customer = new Customer({
        name: c.name,
        email: c.email,
        password: bcrypt.hashSync(c.password, salt),
        accountIds: c.accountIds
    })
    // Save to database
    const result = await customer.save();
    console.log('Result', result);
}

async function run() {
    console.log("Running...")
    const c = { name: "Ben", email: "ben@gmail.com", password: "testpass", accountIds: ["None"] };
    createCustomer(c);
    //customer.save()
   // console.log(customer);
}

run();
