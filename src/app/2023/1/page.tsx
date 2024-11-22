"use client";

import { type CalibrationValue, getCalibrationValueSums } from "@/utils/trebuchet";
import { Card, Container, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function ProblemOne2023() {
    const [digitSum, setDigitSum] = useState<number>(0);
    const [digitAndWordSum, setDigitAndWordSum] = useState<number>(0);
    const calibrationValuesMemo = useRef<Map<string, CalibrationValue>>(new Map());

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const calibrationDoc = event.target.value;
        const { digit, digitAndWord } = getCalibrationValueSums(calibrationDoc, calibrationValuesMemo.current);
        setDigitSum(digit);
        setDigitAndWordSum(digitAndWord);
    }
    
    return (
        <Container sx={{ height: "100vh - 128px", display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Typography variant="h4">Trebuchet Calibrator</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="body1">Enter your calibration document below to receive the calibrated trebuchet settings.</Typography>
                </Grid>
                <Grid size={6}>
                    <TextField
                        label="Calibration Document"
                        onChange={handleInputChange}
                        multiline
                        variant="outlined"
                        fullWidth
                        maxRows={24}
                        slotProps={{ 
                            inputLabel: { shrink: true },
                        }}
                    />
                </Grid>
                <Grid size={6}>
                    <Card raised sx={{ padding: 2 }}>
                        <Typography variant="body1">{`Calibration Value Sum: ${digitAndWordSum}`}</Typography>
                        <Typography variant="body1">{`Calibration Value Sum (Digits Only): ${digitSum}`}</Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}