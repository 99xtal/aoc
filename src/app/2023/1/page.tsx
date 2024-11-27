"use client";

import { Modal } from "@/components/Modal";
import { type CalibrationValue, getCalibrationValueSums } from "@/utils/trebuchet";
import { Button, Card, Container, FormControl, Grid2 as Grid, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function ProblemOne2023() {
    const [digitSum, setDigitSum] = useState<number>(0);
    const [digitAndWordSum, setDigitAndWordSum] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const calibrationValuesMemo = useRef<Map<string, CalibrationValue>>(new Map());

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    }

    const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { digit, digitAndWord } = getCalibrationValueSums(inputValue, calibrationValuesMemo.current);
      setDigitSum(digit);
      setDigitAndWordSum(digitAndWord);
      setModalOpen(false);
    }
    
    return (
        <Container sx={{ height: "100vh - 128px", display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Typography variant="h4">Trebuchet Calibrator</Typography>
                </Grid>
                <Grid size={6}>
                    <Typography variant="body1">
                      Upload a calibration document to view calibration values and receive the calibrated trebuchet settings.
                    </Typography>
                </Grid>
                <Grid size={6}>
                  <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>Upload Document</Button>
                </Grid>
                <Grid size={6}>
                    <Card raised sx={{ padding: 2 }}>
                        <Typography variant="body1">{`Calibration Value Sum: ${digitAndWordSum}`}</Typography>
                        <Typography variant="body1">{`Calibration Value Sum (Digits Only): ${digitSum}`}</Typography>
                    </Card>
                </Grid>
            </Grid>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <form onSubmit={handleUpload}>
                <Stack gap={2}>
                  <FormControl>
                    <TextField
                      label="Calibration Document"
                      value={inputValue}
                      onChange={handleInputChange}
                      multiline
                      variant="outlined"
                      fullWidth
                      rows={8}
                      slotProps={{ 
                        inputLabel: { shrink: true },
                      }}
                    />
                  </FormControl>
                  <Button variant="contained" color="primary" type="submit">Upload</Button>
                </Stack>
              </form>
            </Modal>
        </Container>
    )
}