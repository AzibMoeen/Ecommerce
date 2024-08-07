import mongoose ,{Schema} from "mongoose";


const orderSchema = new Schema({
user: {
    type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        },
        seller: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required : false
    },
   
  }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled']
    },
    address:{
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: false
}
   
   },
  {timestamps:true}
);
  
 export const Order = mongoose.model('Order', orderSchema);
  