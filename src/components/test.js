import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

export default function BasicSpeedDial() {
    return (
        <Box sx={{ height: 320 }}>
            <Button
                sx={{ position: "sticky", bottom: 0, right: 16, backgroundColor: "#37AEF2", borderRadius: "50%", height: "63px" }}
                href="/newDiary"
            >
                <SpeedDialIcon sx={{ color: "#0c1929" }} />
            </Button>
        </Box>
    );
}
