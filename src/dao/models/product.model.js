import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

//Se crea el schema y model de productos

const productoSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description:  {
        type:String,
        required: true
    },
    price:  {
        type:Number,
        required: true
    },
    img: {
        type:String
    },
    code:  {
        type:String,
        required: true,
        unique: true
    },
    stock:  {
        type:Number,
        required: true
    },
    category:  {
        type:String,
        required: true
    },
    status:  {
        type:Boolean,
        required: true
    },
    thumbnails:  {
        type:[String]
    }

})

// Creamos el model y exportamos
productoSchema.plugin(paginate);

const ProductModel = mongoose.model("products", productoSchema);
export default ProductModel;