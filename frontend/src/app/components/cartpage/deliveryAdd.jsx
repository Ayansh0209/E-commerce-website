import { Button, Grid } from "@mui/material";
import AddressCard from "./addresscard";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

export default function DeliveryAdd() {
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobile: data.get("phoneNumber")
        }
        console.log("address", address); // Changed data to address here to log the object
    }

    return (
        <div>
            {/* This OUTER Grid is fine. It controls the 2-column page layout. */}
            <Grid container spacing={4}>
                <Grid item xs={12} lg={5} className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll">
                    <div className="p-5 py-7 border-b cursor-pointer">
                        <AddressCard />
                        <Button sx={{ mt: 2, bgcolor: "RGB(145 85 253 )" }}
                            size="large"
                            variant="contained"
                        >
                            Deliver Here
                        </Button>
                    </div>
                </Grid>

                {/* This is the Form column */}
                <Grid item xs={12} lg={7}>
                    <Box className="border rounded-s-md shadow-md p-5">
                        <form onSubmit={handleSubmit}>

                            {/* THIS IS THE FIX:
                              We replaced the inner <Grid container> with Tailwind's grid.
                            */}
                            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                
                                {/* First Name */}
                                <div className="sm:col-span-3">
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="sm:col-span-3">
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        autoComplete="family-name"
                                    />
                                </div>

                                {/* Address */}
                                <div className="col-span-6">
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        autoComplete="shipping street-address"
                                        multiline
                                        rows={4}
                                    />
                                </div>

                                {/* City */}
                                <div className="sm:col-span-2">
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </div>

                                {/* State / Province */}
                                <div className="sm:col-span-2">
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State / Province / Region"
                                        fullWidth
                                        autoComplete="shipping address-level1"
                                    />
                                </div>

                                {/* Zip / Postal Code */}
                                <div className="sm:col-span-2">
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal Code"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="sm:col-span-3">
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete="tel"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="col-span-6">
                                    <Button sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253 )" }}
                                        size="large"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Deliver Here
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}