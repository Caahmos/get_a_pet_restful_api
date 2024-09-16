import { Router } from "express";
import RegisterUserController from "../controllers/User/RegisterUserController";
import LoginUserController from "../controllers/User/LoginUserController";
import DetailUserController from "../controllers/User/DetailUserController";

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
        this.router.get('/:userId', DetailUserController.handle)
    }

    patchRoutes(){

    }

    deleteRoutes(){

    }
};

export default UserRoutes;

