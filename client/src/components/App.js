import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";

import SearchBox from "./SearchBox";
import CardList from "./CardList";

export default function App() {

    const [query, setQuery] = useState({
        keywords: "",
        colors: [],
        product: "",
        cardTypes: [],
        rarities: [],
        bloomLevels: []
    });

    return (
        <Container sx={{
            marginY: 4
        }}>
            <Box sx={{textAlign: "center"}}>
            <Typography sx={{margin: 4, fontSize: 36, fontWeight: "bold", color: "#534B88"}}>Hololive OCG Cardlist</Typography>
            </Box>

            <Box sx={{
                bgcolor: "white",
                borderRadius: 2,
                padding: 2
            }}>
                <SearchBox setQuery={setQuery}/>
                <br /><hr /><br />
                <CardList query={query}/>
            </Box>
        </Container>
    );
}