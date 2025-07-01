import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";

import "./css/style.css"
import App from "./components/App";


const root = createRoot(document.getElementById("root"));

const theme = createTheme({
    palette: {
        primary: {
            main: "#534B88"
        }
    }
})

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <div className="bg" />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);