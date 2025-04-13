import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useLocation } from 'react-router';







export default function Menu() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const location = useLocation();

    const path = location.pathname;
    console.log(path);
    

    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Clubes de Futbol
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={handleClick} component={ Link } to="/" selected={ path === "/"}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Todos los clubes" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DashboardCustomizeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Paises Bajos" />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DashboardCustomizeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chile" />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DashboardCustomizeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Uruguay" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>

            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Crear Registro
                    </ListSubheader>
                }
            >
                <ListItemButton component={ Link } to="/create" selected={ path === "/create"}>
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Crear Club" />
                    
                </ListItemButton>
            </List>
        </>
    );
}
