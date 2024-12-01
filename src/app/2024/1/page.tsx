"use client";

import { Modal } from "@/components/Modal";
import { getLocationsTotalDistance, getSimilarityScore } from "@/utils/location-id";
import { Button, Card, Container, FormControl, Grid2 as Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ProblemOne2024() {
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [similarityScore, setSimilarityScore] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const leftList = [];
        const rightList = [];

        for (const line of inputValue.split("\n")) {
            const matches = line.match(/[0-9]+/g);
            if (matches?.length === 2) {
                leftList.push(parseInt(matches[0]));
                rightList.push(parseInt(matches[1]));
            }
        }

        const totalDistance = getLocationsTotalDistance(leftList, rightList);
        const similarityScore = getSimilarityScore(leftList, rightList);
        setSimilarityScore(similarityScore);
        setTotalDistance(totalDistance);
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
                    <Typography variant="h6">Total Distance: {totalDistance}</Typography>
                    <Typography variant="h6">Similarity Score: {similarityScore}</Typography>
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