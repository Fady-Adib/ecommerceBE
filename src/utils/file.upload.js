import mongoose from "mongoose";
import multer from "multer";
import appErr from "./handler/appErr.js";


const fileUpload=()=>{
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "my-uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new mongoose.Types.ObjectId()+"_"+file.originalname);

  },
});
function fileFilter(req, file, cb) {

if (file.mimetype.startsWith("image")) {
  cb(null, true);

}else{

cb( new appErr("this file is not required"), false); 
}







}

const upload = multer({ storage: storage, fileFilter });

return upload

}


export const singleUpload=(fieldName)=>fileUpload().single(fieldName)
export const fieldUpload = (fieldName) => fileUpload().fields(fieldName);