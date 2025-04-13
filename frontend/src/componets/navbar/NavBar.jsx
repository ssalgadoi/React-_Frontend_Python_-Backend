// Importamos React y el hook useState
import { useState } from 'react';

// Importamos componentes de Material UI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';

// Importamos los íconos para el botón de menú
import MenuOpenIcon from '@mui/icons-material/MenuOpen'; // Ícono cuando el menú está expandido
import MenuIcon from '@mui/icons-material/Menu';         // Ícono cuando el menú está reducido

// Importamos componentes personalizados
import Menu from './Menu';           // Menú grande
import ShortMenu from './ShortMenu'; // Menú reducido

// Importamos el logo
import logo from '../../assets/Logo CBI App.png';

// Definimos los anchos del menú expandido y contraído
const drawerWidth = 240;
const shortDrawerWidth = 80;

export default function NavBar({ content }) {
    // Estado para controlar si el menú está expandido o reducido
    const [isBigMenu, setIsBigMenu] = useState(false);

    // Función que cambia el estado del menú (expande o reduce)
    const changeMenu = () => {
        setIsBigMenu(!isBigMenu);
    };

    return (
        // Contenedor principal en forma de flexbox
        <Box sx={{ display: 'flex' }}>
            <CssBaseline /> {/* Normaliza los estilos por defecto del navegador */}

            {/* Barra superior fija */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ marginRight: '300px', color: 'white' }}>
                    {/* Botón para alternar entre menú grande y pequeño */}
                    <IconButton onClick={changeMenu} color="inherit">
                        {isBigMenu ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>

                    {/* Logo de la aplicación */}
                    <img src={logo} width="10%" style={{ marginRight: 'auto' }} />
                </Toolbar>
            </AppBar>

            {/* Menú lateral permanente */}
            <Drawer
                variant="permanent"
                sx={{
                    width: isBigMenu ? drawerWidth : shortDrawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: isBigMenu ? drawerWidth : shortDrawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar /> {/* Espacio para alinear con AppBar */}
                {/* Renderiza el menú grande o el corto según el estado */}
                {isBigMenu ? <Menu /> : <ShortMenu />}
            </Drawer>

            {/* Área de contenido principal */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar /> {/* Espaciado para que el contenido no quede debajo del AppBar */}
                {content}   {/* Aquí se renderiza el contenido que venga como prop */}
            </Box>
        </Box>
    );
}
