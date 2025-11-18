"use client";
import { Button } from "@mui/material";
import CartItem from "../components/cartpage/cartItem";
export default function CartPage() {
    // dummy cart data for UI


    return (
        <div className="">
            <div className="lg:grid grid-cols-2 lg:px-16 realtive pt-5">
                <div className="grid-cols-2">

                    <CartItem />
                </div>
                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
                    <div className="uppercase font-bold">Order Summary</div>
                    <hr />
                    <div className="space-y-3 semi-bold">
                        <div className="flex justify-between pt-3 text-black">
                            <span>Price</span>
                            <span>4697</span>
                        </div>
                         <div className="flex justify-between pt-3 ">
                            <span>Discount</span>
                            <span className="text-green-600">4697</span>
                        </div>
                         <div className="flex justify-between pt-3 text-black">
                            <span>Delivery Charge </span>
                            <span className="text-green-600">Free</span>
                        </div>
                         <div className="flex justify-between pt-3 text-black">
                            <span>Total Amount</span>
                            <span className="text-green-600">1278</span>
                        </div>
                    </div>
                    <Button variant="contained" className="w-full mt-5" sx={{px:"2.5rem" ,py:".7rem",bgcolor:"#9155fd"}}>
                        Checkout
                    </Button>
                </div>
            </div>

        </div>
    );
}
