import Sendotp from '../controllers/sendotptomail';
import express from 'express';
const Router = express.Router();

Router.get('/sendotp/:id',Sendotp);

export default Router;