import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function ButtonGroup({options, handleChange, values}) {

    const selected = {
        backgroundColor: "#534B88",
        color: "white"
    };

    return (
        <Box sx={{display: "flex", gap: 1}}>
            {
                options.map((option, index) => 
                    <Button
                        key={index}
                        variant="outlined"
                        sx={values?.includes(option[0]) || (option[0] == "" && values.length == 0) ? selected : null}
                        onClick={() => handleChange(option[0])}
                    >
                        {option[1]}
                    </Button>
                )
            }
        </Box>
    );
}