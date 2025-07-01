import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Select, MenuItem, Menu } from "@mui/material";

import Card from "./Card";
import { OptionRarity } from "../lib/utils";

const data = require("../cards.json");

const SortType = {
    DEFAULT: "DEFAULT",
    NAME: "NAME",
    RARITY: "RARITY",
    CARDNO: "CARDNO"
};

export default function CardList({query}) {

    const pageLimit = 60;
    const hideCards = false;

    const [searchResult, setSearchResult] = useState([]);
    const [sortBy, setSortBy] = useState(SortType.DEFAULT);
    const [pageNum, setPageNum] = useState(1);
    
    const [display, setDisplay] = useState(null);


    function matchKeywords(query, card) {
        return query.keywords == "" || card.name.toLowerCase().includes(query.keywords.toLowerCase());
    }

    function matchColor(query, card) {
        // no filter on color
        if(query.colors.length == 0)
            return true;

        // is support card
        else if(card.color == "")
            return false;

        for(let color of card.color) {
            if(query.colors.includes(color))
                return true;
        }

        return false;
    }

    function matchProduct(query, card) {
        if(query.product == "")
            return true;
        
        for(let product of card.products) {
            if(query.product == product)
                return true;
        }
    }

    function matchCardTypes(query, card) {
        if(query.cardTypes.length == 0)
            return true;

        for(let type of card.card_type) {
            if(query.cardTypes.includes(type))
                return true;
        }

        return false;
    }

    function matchRarity(query, card) {
        if(query.rarities.length == 0)
            return true;
        
        return query.rarities.includes(card.rarity);
    }

    function matchBloomLevel(query, card) {
        if(query.bloomLevels.length == 0)
            return true;

        return query.bloomLevels.includes(card.bloom);
    }

    function sortDefault(a, b) {
        return a.id - b.id;
    }

    function sortName(a, b) {
        return a.name.localeCompare(b.name, "ja");
    }

    function sortCardNo(a, b) {
        let cmp = a.cardno.localeCompare(b.cardno);
        if(cmp == 0) {
            return sortRarity(a, b);
        }
        return cmp;
    }

    function sortRarity(a, b) {
        let rarities = Object.values(OptionRarity);
        return rarities.indexOf(a.rarity) - rarities.indexOf(b.rarity);
    }

    function getSearchResult() {
        return doSort(data.filter(card =>
            matchProduct(query, card) &&
            matchKeywords(query, card) &&
            matchRarity(query, card) &&
            matchCardTypes(query, card) &&
            matchColor(query, card) &&
            matchBloomLevel(query, card) &&
            true
        ), sortBy);
    }

    function doSort(arr, value) {
        switch(value) {
            case SortType.NAME:
                return arr.sort(sortName);
            case SortType.RARITY:
                return arr.sort(sortRarity);
            case SortType.CARDNO:
                return arr.sort(sortCardNo);
            default:
                return arr.sort(sortDefault);
        }
    }

    useEffect(() => {
        if(hideCards) {
            setSearchResult([]);
            return;
        }

        let result = getSearchResult();
        setSearchResult(result);
        setPageNum(1);
    }, [query]);

    function handleSort(value) {
        setSortBy(value);
        setSearchResult(doSort(searchResult, value));
    }

    let imgOverlay =
        <Box
            sx={{
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                position: "fixed",
                backgroundColor: "rgb(0, 0, 0, 0.75)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            onClick={() => setDisplay(null)}
        >
            <a target="_blank" href={`https://hololive-official-cardgame.com/cardlist/?id=${display?.id}`} onClick={(e) => e.stopPropagation()}>
                <img src={"https://hololive-official-cardgame.com" + display?.img}/>
            </a>
        </Box>;

    let pageNav = 
        searchResult.length > pageLimit ?
            <Box sx={{
                marginBottom: 2,
                display: "flex",
                gap: 1
            }}>
                {
                    Array.from({length: Math.ceil(searchResult.length / pageLimit)})
                        .map((_, index) =>
                            <Button variant="outlined"
                                key={index}
                                sx={{minWidth: 0}}
                                disabled={index+1 == pageNum}
                                onClick={() => setPageNum(index+1)}
                            >
                                {index+1}
                            </Button>
                    )
                }
                
            </Box> : <br />

    return (
        <Box> 
            <Typography sx={{fontSize: 24}}>
                Result: {searchResult.length == 0 ? 0 :
                    `${(pageNum-1) * pageLimit + 1} – ${Math.min(pageNum * pageLimit, searchResult.length)} of ${searchResult.length}`
                } cards
            </Typography>
            <br />
            <Select
                value={sortBy}
                sx={{width: "20%", marginBottom: 2}}
                onChange={e => handleSort(e.target.value)}
            >
                <MenuItem value={SortType.DEFAULT}>Default</MenuItem>
                <MenuItem value={SortType.NAME}>Sort By Name</MenuItem>
                <MenuItem value={SortType.RARITY}>Sort By Rarity</MenuItem>
                <MenuItem value={SortType.CARDNO}>Sort By Card No.</MenuItem>
            </Select>
            
            {pageNav}
            
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 1
            }}>
                {
                    searchResult.slice((pageNum-1) * pageLimit, pageNum * pageLimit).map((card, index) =>
                        <Card key={index} card={card} setDisplay={() => setDisplay(card)}/>
                    )
                }
            </Box>
            <br />
            {pageNav}
            {display != null ? imgOverlay : null}
        </Box>
    )
}