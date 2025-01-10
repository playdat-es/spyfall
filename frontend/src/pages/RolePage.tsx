import { Box, Divider, Stack, Typography } from "@mui/material"

// DUMMY DATA
const user = {
    name: 'Amy'
}

function RolePage() {
    return(
        <Box>
            <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                <div>Face Icon</div>
                <Typography>{user.name}</Typography>
            </Stack>
            <Divider />
            
        </Box>
    )
}

export default RolePage