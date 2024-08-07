import mongoose,{Schema} from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  image:{
    required:true,
    type:String
  },
  seller:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    Category:{
      type: String,
      required: true,
      index : true
  }

  
},{timestamps:true});

 export const Product = mongoose.model('Product', productSchema);

