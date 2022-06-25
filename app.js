const express = require("express");
const cors = require("cors");
const routerUsers = require('./routes/Users');
const routerShoesMenu = require('./routes/ShoesMenu');

const app = express();
app.use(express.json());

app.use(cors(
    {
        "origin":   "*"
    }
))

app.listen(process.env.PORT || 3001, () =>{
    console.log("Server is running at 3001");
})

app.use('/users', routerUsers);
app.use('/shoesmenu', routerShoesMenu);


