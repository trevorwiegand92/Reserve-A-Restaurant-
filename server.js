// Dependencies

const express = require('express');
const path = require('path');


//tells node that we're using the express app
const app = express();

//set up initial port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// database.//

let tables = [
    {customerName: "Trevor", phoneNumber: "8158158115", customerEmail: "customer1@aol.com", customerID: "32346" },

    {customerName: "Batman", phoneNumber: "815983456", customerEmail: "customer1234@aol.com", customerID: "65874" }
];

let waitlist = [{
    customerName: "waiting", phoneNumber: "8156343093", customerEmail: "wait1@aol.com", customerID: "234565"
}]


//routes//

//basic route that sends the user to the first page.//
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/home.html'))
});

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, './public/tables.html'))
});

app.get('/reservation', (req, res) => {
    res.sendFile(path.join(__dirname, './public/reservation.html'))
});


//get all tables.//

app.get('/api/tables', (req, res) => res.json(tables));

//get wait list tables//
app.get('/api/waitlist', (req, res) => res.json(waitlist));

//post new reservation.//
app.post('/api/tables', (req, res) => {
    const newTable = req.body;
    console.log(newTable);
    if (tables.length < 5) {
        tables.push(newTable);
        res.json(true);
    }  else {
        waitlist.push(newTable);
        res.json(false);
    }
});
  
//clear out the data.//
app.post('/api/clear', (req, res) => {
    tables.length = 0;
    waitlist.length = 0;

    res.json({ ok: true });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
