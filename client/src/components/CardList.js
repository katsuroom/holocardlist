import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";
import { toKatakana, toRomaji } from "wanakana";

import { OptionRarity } from "../lib/utils";
import Card from "./Card";
import PageNav from "./PageNav";

const data = require("../cards.json");

const SortType = {
    RELEASE: "RELEASE",
    NAME: "NAME",
    RARITY: "RARITY",
    CARDNO: "CARDNO"
};

export default function CardList({query}) {

    const pageLimit = 60;
    const hideCards = false;

    const [searchResult, setSearchResult] = useState([]);
    const [sortBy, setSortBy] = useState(SortType.RELEASE);
    const [pageNum, setPageNum] = useState(1);
    
    const [display, setDisplay] = useState(null);


    function matchKeywords(query, card) {
        let a = toRomaji(toKatakana(card.name).toLowerCase());
        let b = toRomaji(toKatakana(query.keywords).toLowerCase());

        return query.keywords == "" || a.includes(b);
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

    function sortRelease(a, b) {
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
                return arr.sort(sortRelease);
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

    let pageNav =
        <PageNav pageNum={pageNum} totalPages={Math.ceil(searchResult.length / pageLimit)} setPageNum={setPageNum}/>;

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

    return (
        <Box
            sx={{
                display: "grid",
                gap: 1
            }}
        >
            <Typography sx={{fontSize: 24}}>
                {
                    searchResult.length == 0 ? 0 :
                    `${(pageNum-1) * pageLimit + 1} – ${Math.min(pageNum * pageLimit, searchResult.length)} of ${searchResult.length}`
                } cards
            </Typography>
            <Select
                value={sortBy}
                sx={{width: "20%", marginBottom: 1}}
                onChange={e => handleSort(e.target.value)}
            >
                <MenuItem value={SortType.RELEASE}>Sort By Release</MenuItem>
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
            {pageNav}
            {display != null ? imgOverlay : null}
        </Box>
    )
}