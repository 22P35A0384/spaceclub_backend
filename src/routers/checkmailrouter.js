import Checkmail from "../controllers/checkmail";
import express from 'express';
const Router = express.Router()

Router.get('/checkmail/:mail',Checkmail);

export default Router;