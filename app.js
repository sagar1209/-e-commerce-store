const express = require('express');
const mongoDb = require('./config/db');

const adminRoutes = require('./routes/admin/admin');
const userRoutes = require('./routes/user/user');

const app = express();
mongoDb();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin',adminRoutes);
app.use('/user',userRoutes);


app.get('/',(req,res)=>{
    res.send({
      "user" :"sagar",   
    })
})

app.listen(PORT,()=>{
    console.log("server is listening on port " + PORT);
})