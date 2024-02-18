import express from "express";
import http from "http"; // Import the 'http' module
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import Getimgapp from './src/routers/getimgrouter.js';
import Getdatabyrollnoapp from './src/routers/getdatabyrollnorouter.js';
import Sendotptomailapp from './src/routers/sendotptomailrouter.js';
import Addnewuserapp from './src/routers/addnewuserrouter.js';
import Getloginapp from './src/routers/getloginrouter.js';
import Checkmailapp from './src/routers/checkmailrouter.js';
import Forgotpassapp from './src/routers/forgotpassrouter.js';
import Updatepassapp from './src/routers/updatepassrouter.js';
import Getdatabymailapp from './src/routers/getdatabymailrouter.js';
import Getprofileapp from './src/routers/getprofilerouter.js';


const app = express();
app.use(bodyParser.json())
app.use(cors())
mongoose.connect("mongodb+srv://gangadharjami:Xyd11TsTf0GfkNLu@cluster0.egjdqci.mongodb.net/cluster0?retryWrites=true&w=majority")
    .then(() => {
        // Create HTTP server using 'http.createServer'
        const server = http.createServer(app);
        
        // Specify the port and hostname for the server to listen on
        const port = process.env.PORT || 5000;
        const hostname = '0.0.0.0';

        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
            console.log('Database Connected && Server Started Successfully!! :)');
        });
    })
    .catch((err) => console.log(err));

// Frontend Is Yours, But Backend Was Not, It Was Mine If You Touch It Then It Will Hurt You Very Hard, A Sweet Warning For Next Developer.... :) @Gangadhar Jami

// Don't Touch (Actual Production Code..!!!) <Serious Warning For Every One, Including You Also....!!>
app.use('/',Getimgapp);
app.use('/',Getdatabyrollnoapp);
app.use('/',Sendotptomailapp);
app.use('/',Addnewuserapp);
app.use('/',Getloginapp);
app.use('/',Checkmailapp);
app.use('/',Forgotpassapp);
app.use('/',Updatepassapp); 
app.use('/',Getdatabymailapp);
app.use('/',Getprofileapp)

// Testing Space...... (After Sucessfully Tested Then Put The Code To Controllers And Routers, Finally Import In The Actual Production Code)

app.get('/testing',(req,res,next)=>{
    res.send('hello world')
})
