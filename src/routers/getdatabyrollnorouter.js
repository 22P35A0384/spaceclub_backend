import Getdatabyrollno from "../controllers/getdatabyrollno";
import express from 'express';
const Router = express.Router();

Router.get('/data/:rollno',Getdatabyrollno);

export default Router;