import Getdatabymail from "../controllers/getdatabymail";
import express from 'express';
const Router = express.Router();

Router.get('/getdata/:mail',Getdatabymail);

export default Router;