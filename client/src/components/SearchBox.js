import React, { useState } from "react";
import { Box, TextField, InputAdornment, Button, Typography, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import typeWhite from "../img/type_white.png";
import typeGreen from "../img/type_green.png";
import typeRed from "../img/type_red.png";
import typeBlue from "../img/type_blue.png";
import typePurple from "../img/type_purple.png";
import typeYellow from "../img/type_yellow.png";
import ButtonGroup from "./ButtonGroup";

import { OptionColor, OptionProduct, OptionCardType, OptionRarity, OptionBloom } from "../lib/utils";

export default function SearchBox({setQuery}) {

    const [keywords, setKeywords] = useState("");
    const [colors, setColors] = useState([]);
    const [product, setProduct] = useState(0);   // index
    const [cardTypes, setCardTypes] = useState([]);
    const [rarities, setRarities] = useState([]);
    const [bloomLevels, setBloomLevels] = useState([]);

    const searchCategory = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "right",
        marginRight: 2
    };

    function handleKeyPress(e) {
        if(e.key == "Enter") {
            doSearch();
        }
    }

    function doSearch() {
        setQuery({
            keywords: keywords,
            colors: colors,
            product: OptionProduct[product][1],
            cardTypes: cardTypes,
            rarities: rarities,
            bloomLevels: bloomLevels
        });
    }

    function resetSearch() {
        setKeywords("");
        setColors([]);
        setProduct(0);
        setCardTypes([]);
        setRarities([]);
        setBloomLevels([]);
    }

    function handleSelector(value, state, setState) {
        if(value == "") {
            setState([]);
            return;
        }

        let index = state.indexOf(value);
        if(index != -1) {
            let arr = [...state];
            arr.splice(index, 1);
            setState(arr);
            return;
        }

        setState([...state, value]);
    }

    return (
        <Box>
            <TextField
                label="Search Cards"
                variant="outlined"
                autoComplete="false"
                autoCorrect="false"
                fullWidth={true}
                onKeyDown={handleKeyPress}
                onChange={e => setKeywords(e.target.value)}
                value={keywords}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }
                }}
            />

            <Box sx={{display: "grid", gridTemplateColumns: "auto auto", marginY: 2, gap: 1}}>
                <Box sx={searchCategory}><Typography>Color</Typography></Box>
                <ButtonGroup options={[
                    [OptionColor.ALL, "All"],
                    [OptionColor.WHITE, <img src={typeWhite} style={{width: "24px"}} />],
                    [OptionColor.GREEN, <img src={typeGreen} style={{width: "24px"}} />],
                    [OptionColor.RED, <img src={typeRed} style={{width: "24px"}} />],
                    [OptionColor.BLUE, <img src={typeBlue} style={{width: "24px"}} />],
                    [OptionColor.PURPLE, <img src={typePurple} style={{width: "24px"}} />],
                    [OptionColor.YELLOW, <img src={typeYellow} style={{width: "24px"}} />]
                    ]}
                    handleChange={(value) => handleSelector(value, colors, setColors)}
                    values={colors}
                />

                <Box sx={searchCategory}><Typography>Product</Typography></Box>
                <Select
                    value={product}
                    displayEmpty
                    onChange={e => setProduct(e.target.value)}
                >
                    {
                        OptionProduct.map((product, index) => {
                            return <MenuItem
                                key={index}
                                sx={product[1].includes("hBP") ? {fontWeight: "bold"} : null}
                                value={index}
                            >
                                {product[0]}
                            </MenuItem>;
                        })
                    }
                </Select>

                <Box sx={searchCategory}><Typography>Card Type</Typography></Box>
                <ButtonGroup options={[
                    [OptionCardType.ALL, "All"],
                    [OptionCardType.HOLOMEM, "Holomem"],
                    [OptionCardType.BUZZ, "Buzz Holomem"],
                    [OptionCardType.OSHI, "Oshi Holomem"],
                    [OptionCardType.SUPPORT, "Support"],
                    [OptionCardType.LIMITED, "Limited"],
                    [OptionCardType.YELL, "Yell"]
                    ]}
                    handleChange={(value) => handleSelector(value, cardTypes, setCardTypes)}
                    values={cardTypes}
                />

                <Box sx={searchCategory}><Typography>Rarity</Typography></Box>
                <ButtonGroup options={[
                    [OptionRarity.ALL, "All"],
                    [OptionRarity.RR, "RR"],
                    [OptionRarity.R, "R"],
                    [OptionRarity.U, "U"],
                    [OptionRarity.C, "C"],
                    [OptionRarity.OSR, "OSR"],
                    [OptionRarity.OC, "OC"]
                    ]}
                    handleChange={(value) => handleSelector(value, rarities, setRarities)}
                    values={rarities}
                />

                <Box />
                <ButtonGroup options={[
                    [OptionRarity.SEC, "SEC"],
                    [OptionRarity.OUR, "OUR"],
                    [OptionRarity.UR, "UR"],
                    [OptionRarity.SY, "SY"],
                    [OptionRarity.SR, "SR"],
                    [OptionRarity.S, "S"],
                    [OptionRarity.P, "P"]
                    ]}
                    handleChange={(value) => handleSelector(value, rarities, setRarities)}
                    values={rarities}
                />

                <Box sx={searchCategory}><Typography>Bloom Level</Typography></Box>
                <ButtonGroup options={[
                    [OptionBloom.ALL, "All"],
                    [OptionBloom.DEBUT, "Debut"],
                    [OptionBloom.FIRST, "1st"],
                    [OptionBloom.SECOND, "2nd"],
                    [OptionBloom.SPOT, "Spot"]
                    ]}
                    handleChange={(value) => handleSelector(value, bloomLevels, setBloomLevels)}
                    values={bloomLevels}
                />
            </Box>

            <Box sx={{
                marginTop: 2,
                width: "100%",
                textAlign: "center",
            }}>
                <Button sx={{marginX: 1}} variant="outlined" onClick={doSearch}>
                    Search
                </Button>
                <Button sx={{marginX: 1}} variant="outlined" onClick={resetSearch}>
                    Reset
                </Button>
            </Box>
        </Box>
    )
}