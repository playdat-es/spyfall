import { Box, Button, Divider, Stack, Typography } from "@mui/material"

// DUMMY DATA
const user = {
    name: 'Amy'
}

function RolePage() {
    const isSpy = false

    return(
        <Stack>
            <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                <div>Face Icon</div>
                <Typography>{user.name}</Typography>
            </Stack>
            <Divider />
            <Typography>Your Role</Typography>
            <Typography>[Role]</Typography>
            {!isSpy &&
                <Box>
                    <Typography>Location</Typography>
                    <Typography>[Location]</Typography>
                </Box>
            }
            <Button variant="contained" disabled>XX Minutes Left</Button>
        </Stack>
    )
}

export default RolePage