import { LeftBar } from '../components/LeftBar'
import { SonnyAngelMain } from '../components/SonnyAngelMain'
import {Box, Container, Stack} from "@mui/material"


export function DashboardPage() {

    return (
        <Box>
            <Stack direction="row" spacing={2} justifyContent={'space-between'}>
                <LeftBar/>
                <SonnyAngelMain/>
            </Stack>
        </Box>
    )
}