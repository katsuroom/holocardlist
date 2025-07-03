import React from "react";
import { Box, Button, Typography } from "@mui/material";

const LIMIT = 3;

export default function PageNav({pageNum, totalPages, setPageNum}) {

    function pageButton(page) {
        return (
            <Button variant="outlined"
                key={page}
                sx={{minWidth: 0}}
                disabled={page == pageNum}
                onClick={() => setPageNum(page)}
            >
                {page}
            </Button>
        );
    }

    function buttonRange(a, b) {
        return (
            Array.from({length: b - a  + 1})
                .map((_, index) => pageButton(a + index)
            )
        );
    }

    const first =
        <>
            {pageButton(1)}
            <Typography sx={{letterSpacing: 2}}>...</Typography>
        </>;

    const last =
        <>
            <Typography sx={{letterSpacing: 2}}>...</Typography>
            {pageButton(totalPages)}
        </>;

    function pageNav() {

        // return full range
        if(totalPages <= LIMIT * 2 + 1) {
            return buttonRange(1, totalPages);
        }

        let before = pageNum - LIMIT;
        let after = pageNum + LIMIT;

        if(before < 1) {
            after += 1 - before;
            before = 1;
        }
        else if(after > totalPages) {
            before -= after - totalPages;
            after = totalPages;
        }

        return (
            <>
                {pageNum > LIMIT + 1 ? first : null}
                {buttonRange(before, after)}
                {pageNum < totalPages - LIMIT ? last : null}
            </>
        );
    }


    return (
        totalPages > 1 ?
            <Box sx={{
                marginY: 1,
                display: "flex",
                gap: 1
            }}>
                {pageNav()}
            </Box>
        : null
    );
}