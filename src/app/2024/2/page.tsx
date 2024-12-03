"use client";

import { Modal } from "@/components/Modal";
import { analyzeReactorLevels } from "@/utils/reactor";
import { Button, Card, Container, FormControl, Grid2 as Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ProblemTwo2024() {
    const [safeTotal, setSafeTotal] = useState<number>(0);
    const [dampedTotal, setDampedTotal] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let total = 0;
        let dampedTotal = 0;

        for (const line of inputValue.split('\n')) {
            const matches = line.match(/[0-9]+/g);
            if (matches != null) {
                const levels = matches.map((v) => parseInt(v));
                const report = analyzeReactorLevels(levels);
                const reportDamped = analyzeReactorLevels(levels, { dampened: true });
                if (report.safe) {
                    total += 1;
                }
                if (reportDamped.safe) {
                    dampedTotal += 1;
                };
            }
        }

        setSafeTotal(total);
        setDampedTotal(dampedTotal);
    }
    
    return (
        <Container sx={{ height: "100vh - 128px", display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Typography variant="h4">List Comparison</Typography>
                </Grid>
                <Grid size={6}>
                  <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>Upload Lists</Button>
                </Grid>
                <Grid size={6}>
                  <Card>
                    <Typography variant="h6">Safe Total: {safeTotal}</Typography>
                    <Typography variant="h6">Damped Total: {dampedTotal}</Typography>
                  </Card>
                </Grid>
            </Grid>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <form onSubmit={handleUpload}>
                <Stack gap={2}>
                  <FormControl>
                    <TextField
                      label="Lists"
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