import multer from "multer";
import path from 'node:path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/imgs');
    },
    filename: (req, file, cb) => {
        cb(null, String(Math.random() * 1000) + Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });