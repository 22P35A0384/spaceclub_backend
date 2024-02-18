import Getimg from "../controllers/getimg";
import express from 'express';
const Router = express.Router();

Router.get("/img/:id",Getimg);

export default Router;