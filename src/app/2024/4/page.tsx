"use client";

import { Modal } from "@/components/Modal";
import { Button, Card, Container, FormControl, Grid2 as Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { WordSearch } from "@/utils/wordsearch";

export default function ProblemThree2024() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [xmasCount, setXmasCount] = useState<number>(0);
    const [masXCount, setMasXCount] = useState<number>(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const wordSearch = new WordSearch(inputValue);
        setXmasCount(wordSearch.countOccurrences("XMAS"));
        setMasXCount(wordSearch.countMasXes());

        setModalOpen(false);
    }
    
    return (
        <Container sx={{ height: "100vh - 128px", display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Typography variant="h4">X-MAS Crossword Solver</Typography>
                </Grid>
                <Grid size={6}>
                  <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>Upload Crossword</Button>
                </Grid>
                <Grid size={6}>
                    <Card raised sx={{ padding: 2 }}>
                        <Typography variant="body1">{`"XMAS" Occurrences": ${xmasCount}`}</Typography>
                        <Typography variant="body1">{`X-"MAS" Occurrences: ${masXCount}`}</Typography>
                    </Card>
                </Grid>
            </Grid>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <form onSubmit={handleUpload}>
                <Stack gap={2}>
                  <FormControl>
                    <TextField
                      label="Corrupted Memory"
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