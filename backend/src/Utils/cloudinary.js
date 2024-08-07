import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
cloud_name:process.env.CLOUDINARY_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localpath) =>{
try {
    if(!localpath) return null
        const response = await cloudinary.uploader.upload(localpath,{
            resource_type:"auto"
        })
    console.log(
        "file is uploaded on cloudinary",response.url
    );
    console.log("response",response)
    fs.unlinkSync(localpath)     
    return response
} catch (error) {
  
    fs.unlinkSync(localpath)
}
}

const deleteImage = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log('Delete result:', result);
      return result;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  };

export {uploadOnCloudinary,deleteImage}
 