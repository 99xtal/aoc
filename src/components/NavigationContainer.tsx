"use client";

import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from "@mui/icons-material";

const drawerWidth = 240;

type Props = React.PropsWithChildren<{
  drawerContent?: React.ReactNode;
}>;

export default function NavigationContainer({ drawerContent, children }: Props) {
    const theme = useTheme();
    const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((curr) => !curr);
    }

    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar>
            {!isMediumUp && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                    {mobileOpen ? <Close /> : <MenuIcon />}
                </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              99xtal&apos;s Advent Of Code
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant={isMediumUp ? 'permanent' : 'temporary'}
          open={isMediumUp || mobileOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
          onClose={handleDrawerToggle}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    );
}