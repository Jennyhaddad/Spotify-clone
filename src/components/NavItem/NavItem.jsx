import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import './NavItem.css';


const NavItem = ({name, Icon, target}) => {
    return (
        <NavLink 
        to={target} 
        className= {({ isActive }) => isActive ? "NavLink active" : "NavLink" }
       
        style={{ textDecoration: 'none' }}>
            <Box px={3} py={1} sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                cursor: 'pointer',
                '&:hover': { color: 'white'},
                transition: 'color 0.2s ease-in-out ',
                fontSize: 14
                
            }}>
                {Icon && <Icon sx={{ fontSize: 28, marginRight: 1}}/>}
                {name}
                {target}
            </Box>
        </NavLink>
    )
    
}


export default NavItem;