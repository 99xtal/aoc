"use client";

import { Box, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from "@mui/icons-material";
import Link from "next/link";

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
      <div className="flex">
        <header className="min-h-16 flex items-center fixed" style={{ zIndex: 1201 }}>
          <div className="px-6 flex items-center">
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
            <h1 className="text-green drop-shadow-g hover:text-greenhighlight hover:drop-shadow-gh">
              <Link href="/">
                7\&apos;s Advent Of Code
              </Link>
            </h1>
          </div>
        </header>
        <Drawer
          variant={isMediumUp ? 'permanent' : 'temporary'}
          open={isMediumUp || mobileOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#0f0f23' },
            backgroundColor: '#0f0f23'
          }}
          onClose={handleDrawerToggle}
        >
          <div className="min-h-16" />
          {drawerContent}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="min-h-16" />
          {children}
        </Box>
      </div>
    );
}