import Updatepass from "../controllers/updatepass";
import express from 'express';
const Router = express.Router();

Router.put('/updatepass',Updatepass);

export default Router;