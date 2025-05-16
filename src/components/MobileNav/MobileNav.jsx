import React, { useEffect } from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, List } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  // Uppdatera navigationens markerade knapp baserat på path
  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') setValue(0);
    else if (location.pathname === '/dashboard/library') setValue(1);
  }, [location.pathname]);

  const handleNav = (newValue) => {
    setValue(newValue);
    if (newValue === 0) nav('/dashboard');
    if (newValue === 1) nav('/dashboard/library');
  };

  return (
    <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }}>
      <BottomNavigation
        sx={{ backgroundColor: 'background.paper', color: 'text.secondary' }}
        showLabels
        value={value}
        onChange={(e, value) => handleNav(value)}
      >
        <BottomNavigationAction 
          label="Home" 
          icon={<Home />} 
        />
        <BottomNavigationAction 
          label="Library" 
          icon={<List />} 
        />
      </BottomNavigation>
    </Box>
  );
};

export default MobileNav;
