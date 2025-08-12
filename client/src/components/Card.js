import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { OptionLanguage } from "../lib/utils";

export default function Card({card, language, setDisplay}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isHover, setHover] = useState(false);

    const imgRef = useRef();

    useEffect(() => {
        setIsLoaded(false);
    }, [card]);

    useEffect(() => {
        if(imgRef.current?.complete)
            setIsLoaded(true);
    }, [imgRef.current])

    function handleLoad() {
        setIsLoaded(true);
    }

    function handleMouseOver(e) {
        setHover(true);
    }

    function handleMouseLeave(e) {
        setHover(false);
    }

    return (
        <Box
            sx={{
                position: "relative",
                transition: "all 0.3s ease",
                ":hover": {
                    transform: "translateY(-10px)"
                },
                cursor: "pointer"
            }}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={setDisplay}
        >
            <img
                ref={imgRef}
                style={{width: "100%", visibility: imgRef.current?.complete || isLoaded ? "visible" : "hidden"}}
                onLoad={handleLoad}
                src={(language == OptionLanguage.EN ? "https://en.hololive-official-cardgame.com" : "https://hololive-official-cardgame.com") + card.img}
            />

            {
                isHover ? null : 
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        margin: 0,
                        bgcolor: "white",
                        borderTopRightRadius: "0.25em",
                        padding: 1
                    }}
                >
                    <Typography sx={{
                        margin: "0px",
                        lineHeight: 1,
                        fontSize: "0.8em",
                        fontWeight: "bold",
                        color: "gray"
                    }}>
                        {card.cardno} | {card.rarity}
                    </Typography>
                </Box>
            }
            
        </Box>
    );
}