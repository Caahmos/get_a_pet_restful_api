import { Router } from "express";
import RegisterUserController from "../controllers/User/RegisterUserController";
import LoginUserController from "../controllers/User/LoginUserController";

class UserRoutes{
    public router = Router();

    constructor(){
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    postRoutes(){
        this.router.post('/register', RegisterUserController.handle);
        this.router.post('/login', LoginUserController.handle);
    }

    getRoutes(){
    }

    patchRoutes(){

    }

    deleteRoutes(){

    }
};

export default UserRoutes;

