"use client";

import { Modal } from "@/components/Modal";
import { executeInstructions, scanCorruptedMemory } from "@/utils/toboggan";
import { Button, Card, Container, FormControl, Grid2 as Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ProblemThree2024() {
    const [multResult, setMultResult] = useState<number>(0);
    const [multResultWithDos, setMultResultWithDos] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const instructions = scanCorruptedMemory(inputValue);

        const sum = executeInstructions(instructions);
        const sumWithDos = executeInstructions(instructions, { ignoreDos: false });
      
        setMultResult(sum);
        setMultResultWithDos(sumWithDos);
        setModalOpen(false);
    }
    
    return (
        <Container sx={{ height: "100vh - 128px", display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Typography variant="h4">Corrupted Memory Parser</Typography>
                </Grid>
                <Grid size={6}>
                  <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>Upload Corrupted Memory</Button>
                </Grid>
                <Grid size={6}>
                  <Card>
                    <Typography variant="h6">Result: {multResult}</Typography>
                    <Typography variant="h6">Result With do statements: {multResultWithDos}</Typography>
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