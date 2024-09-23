import { Router } from "express";
import RegisterUserController from "../controllers/User/RegisterUserController";
import LoginUserController from "../controllers/User/LoginUserController";
import DetailUserController from "../controllers/User/DetailUserController";
import UpdateUserController from "../controllers/User/UpdateUserController";
import { upload } from "../helpers/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

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
        this.router.get('/:userId', DetailUserController.handle);
    }

    patchRoutes(){
        this.router.patch('/update', isAuthenticated, upload.single('img'), UpdateUserController.handle);
    }

    deleteRoutes(){

    }
};

export default UserRoutes;

