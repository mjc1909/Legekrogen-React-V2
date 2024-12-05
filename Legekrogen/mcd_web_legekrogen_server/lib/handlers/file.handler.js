import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

// Models
import userModel from "../db/models/user.model.mjs";
import productModel from '../db/models/product.model.mjs';
import reviewModel from '../db/models/review.model.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const deleteFile = async (image) => {

    let img = image.split(process.env.SERVER_HOST)[1];

    let imgPath = path.join(__dirname, '../../public' + img);
    console.log(img);
    if(img && img.indexOf('no-') === -1) {

        console.log('unlinking', imgPath, img);

        try {
            fs.unlinkSync(imgPath), {
                force: true,
            }; 
        } catch (error) {
            // console.log(error)
            
        }
    }
};

export const deleteUserImage = async (id) => {

    let old = await userModel.findById({_id: id});
    await deleteFile(old.picture);

};

export const deleteProductImage = async (id) => {

    let old = await productModel.findById({_id: id});
    await deleteFile(old.image);

};

export const deleteReviewImage = async (id) => {

    let old = await reviewModel.findById({_id: id});
    await deleteFile(old.image);

};