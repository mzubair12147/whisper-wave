import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage({
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`)
    }
})

export const upload = multer({ storage: storage });




