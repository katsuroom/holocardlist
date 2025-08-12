import React, { useState } from "react";
import { Container, Box, Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";

import SearchBox from "./SearchBox";
import CardList from "./CardList";
import { OptionLanguage } from "../lib/utils";

export default function App() {

    const [query, setQuery] = useState({
        language: OptionLanguage.JP,
        keywords: "",
        colors: [],
        product: "",
        cardTypes: [],
        rarities: [],
        bloomLevels: []
    });

    function setLanguage(event, lang) {
        setQuery({
            ...query,
            language: lang
        });
    };

    return (
        <>
        <ToggleButtonGroup
            value={query.language}
            exclusive
            onChange={setLanguage}
            sx={{
                position: "absolute",
                backgroundColor: "white",
                marginLeft: 4
            }}
        >
            <ToggleButton value={OptionLanguage.EN}>EN</ToggleButton>
            <ToggleButton value={OptionLanguage.JP}>JP</ToggleButton>
        </ToggleButtonGroup>

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
                <SearchBox query={query} setQuery={setQuery}/>
                <br /><hr /><br />
                <CardList query={query}/>
            </Box>
        </Container>
        </>
    );
}