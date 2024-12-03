"use client";

import { Modal } from "@/components/Modal";
import { generateSafetyReports } from "@/utils/reactor";
import { SafetyReport } from "@/utils/reactor/types";
import { Button, Card, Container, FormControl, Grid2 as Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";

const exampleInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`.trim();

const FormattedLine = ({ line, report }: { line: string, report: SafetyReport }) => {
  const values = line.match(/[0-9]+/g);
  const dampenedIndex = report.dampenedLevels.length > 0 ? report.dampenedLevels[0] : null;

  const getColor = (i: number) => {
    if (dampenedIndex != null && i === dampenedIndex) {
      return 'red';
    }

    return 'black';
  }

  if (values == null) {
    return (
      <p>Invalid Input</p>
    )
  }

  return (
    <span>
      {values.map((v, i) => (
        <span key={i} style={{ color: getColor(i) }}>
          {v}&nbsp;
        </span>
      ))}
    </span>
  )
}

export default function ProblemTwo2024() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(exampleInput);
    const [reports, setReports] = useState<Map<string, SafetyReport>>(() => generateSafetyReports(exampleInput));

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reports = generateSafetyReports(inputValue);
        
        setReports(reports);
        setModalOpen(false);
    }

    const { safeTotal, dampedTotal } = useMemo(() => {
      return Array.from(reports.values()).reduce((acc, report) => {
        if (report.safe) {
          acc.dampedTotal += 1;
          if (report.dampenedLevels.length === 0) {
            acc.safeTotal += 1;
          }
        }
        return acc;
      }, { safeTotal: 0, dampedTotal: 0 });
    }, [reports])
    
    return (
        <Container sx={{ height: "100vh - 128px", display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Typography variant="h4">RNR Reactor Report Analyzer</Typography>
                </Grid>
                <Grid size={6}>
                  <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>Upload Reports</Button>
                </Grid>
                <Grid size={6}>
                  <Card>
                    <Typography variant="h6">Safe Total: {safeTotal}</Typography>
                    <Typography variant="h6">Damped Total: {dampedTotal}</Typography>
                  </Card>
                </Grid>
                <Grid size={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Report</TableCell>
                        <TableCell>Safe</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.from(reports.entries()).map(([line, report], i) => (
                        <TableRow key={i}>
                          <TableCell><FormattedLine line={line} report={report}/></TableCell>
                          <TableCell sx={{ color: report.safe ? 'green' : 'red'}}>{report.safe ? "Yes" : "No"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
            </Grid>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <form onSubmit={handleUpload}>
                <Stack gap={2}>
                  <FormControl>
                    <TextField
                      label="Reports"
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