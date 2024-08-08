import React from 'react'
import { Button } from "@/components/ui/button";
import { useAuth } from '../../utils/AuthContext'
import {  useNavigate } from 'react-router-dom';
import {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
} from "./ui/alert-dialog";
      import { toast } from 'react-toastify';


const Proceed = () => {
    const navigate = useNavigate()
    const { Cart ,setCart } = useAuth()
    const handleClick = async () => {
        Cart.map((item)=>{
           if(item.quantity>item.stock){
               alert('Stock is not available')
               return
           }
        })  
           const res = await fetch('http://localhost:8000/api/v1/users/createorder',{
               method:'POST',
               headers:{
                   'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
               },
               body:JSON.stringify({products:Cart}),
           }
           )
           const data = await res.json()
           console.log(data)
            if(res.ok){
              toast('Order has been Confirmed', {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "success",
                });
           setCart([])
           navigate('/')
           
           }}

       
       const total = Cart.reduce((acc,item)=>acc+item.price*item.quantity,0)
  return (
    <div>
        { Cart.length !== 0 && 
    <AlertDialog>
      <AlertDialogTrigger>Proceed</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Doing this will place order of Rs {total}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>}
    </div>
  )
}

export default Proceed