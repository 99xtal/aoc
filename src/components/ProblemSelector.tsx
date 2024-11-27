"use client";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface Props {
   problemMap: Record<number, number[]>;
}

export default function ProblemSelector({ problemMap }: Props) {
   const router = useRouter();
   const [openYear, setOpenYear] = useState<number | null>(() => {
      const years = Object.keys(problemMap).map(year => parseInt(year)).sort((a, b) => b - a);
      return years.length > 0 ? years[0] : null;
   });

   const years = useMemo(() => {
      return Object.keys(problemMap).map(year => parseInt(year)).sort((a, b) => b - a);
   }, [problemMap]);

   const handleClickYear = (year: number) => {
      setOpenYear(openYear === year ? null : year);
   }

   return (
      <Box sx={{ overflow: 'auto' }}>
         {years.map((year) => (
            <Box key={year}>
               <ListItemButton onClick={() => handleClickYear(year)}>
                  <ListItemText primary={year} />
                  {year === openYear ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Divider />
               <Collapse in={year === openYear} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     {problemMap[year].map(problem => (
                        <Box key={problem}>
                           <ListItemButton onClick={() => router.push(`/${year}/${problem}`)} sx={{ pl: 4 }}>
                              <ListItemText primary={`Day ${problem}`} />
                           </ListItemButton>             
                           <Divider />           
                        </Box>
                     ))}
                  </List>
               </Collapse>            
            </Box>
         ))}
      </Box>
   )
}