const express=require('express');
const cors=require('cors');

const app=express();

app.use(express.json());

app.use(cors({ origin: "*" }));

require('./src/routes/translate')(app);


app.listen(8080,()=>{
    console.log('server started at 8080');
})