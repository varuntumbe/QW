//configuring dot env npm package to load env variables
const dotenv=require('dotenv')
dotenv.config({
    path:'./config.env'
})

const app = require('./app');

//server started
const portno=process.env.PORT || 5000;
app.listen(portno,()=>{
    console.log('server is started');
});
