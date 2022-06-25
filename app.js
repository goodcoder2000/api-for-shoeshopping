const express = require("express");
const cors = require("cors");
const routerUsers = require('./routes/Users');
const routerShoesMenu = require('./routes/ShoesMenu');
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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


