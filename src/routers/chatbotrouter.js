import Chatbot from "../controllers/chatbot";
import express from 'express';
const Router = express.Router();

Router.post('/chatbot',Chatbot);

export default Router;