
import { Button, IconButton } from "@mui/material";
import { Icon } from "lucide-react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
export default function CartItem() {
    return (
        <div className="p-5 shadow-lg border rounder-md">
            <div className="flex item-center">
                <div className="w-20 h-20 lg:w-36  lg:h-36">
                    <img className='w-full h-full object-cover object-top ' src="https://rukminim1.flixcart.com/image/612/612/k4d27ww0/shirt/q/w/t/l-el024-el-senor-original-imafnadnjp5pq6tg.jpeg?q=70" alt="" />
                </div>

                <div className="ml-5 space-y-1">
                    <p className="font-semibold">Men Black Trouser</p>
                    <p className="opacit-70">Size: L,White</p>
                    <p className="opacity-70 mt-2">Seller : Faltu Fashion</p>
                    <div className="flex space-x-4 items-center text-gray-900 pt-5">
                        <p className="font-semibold">199</p>
                        <p className="opacity-50 line through ">211</p>
                        <p className="text-green-600 font-semibold">5% Off</p>

                    </div>
                </div>

            </div>
            <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className="flex items-center space-x-2">
                    <IconButton>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className="py-1 px-7 border rounded-sm"> 3
                    </span>
                    <IconButton sx={{ color: "RGB(145 85 253)" }}>
                        <AddCircleOutlineIcon />
                    </IconButton>


                </div>
                <div>
                    <Button sx={{ color: "RGB(145 85 253)" }}>Remove</Button>
                </div>


            </div>

        </div>
    )
}