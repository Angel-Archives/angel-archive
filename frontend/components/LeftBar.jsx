import React from "react"
import {Box} from "@mui/material"
import { Sort } from "./Sort"
import { Filter} from "./Filter"

export function LeftBar() {


    return (
        <Box bgcolor={"pink"} flex={1} p={2} sx={{display: {xs:"none", sm: "block"}}}>
            <Sort/>
            <Filter/>
        </Box>
    )

}