import { React, useEffect, useMemo, useState } from 'react';

// Componentes de MUI (Material UI) para diseño e íconos
import { Box, Chip, Typography } from '@mui/material';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';

import { MaterialReactTable } from 'material-react-table';

import AxiosInstance from './Axios';

const Home = () => {

  const [myData, setMyData] = useState([]);

  // Función que llama a Django para obtener los clubes de fútbol
  const GetData = () => {
    AxiosInstance.get('clubs/')
      .then((res) => {
        setMyData(res.data);
      })
      .catch((error) => {
        console.error('Error al obtener clubes de fútbol:', error);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  // Definimos las columnas de la tabla
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'country_details.name',
      header: 'País',
    },
    {
      accessorKey: 'league_details.name',
      header: 'Liga',
    },
    {
      accessorKey: 'city',
      header: 'Ciudad',
    },
    {
      accessorKey: 'attendance',
      header: 'Asistencia',
    },
    {
      accessorKey: 'characteristics_details',
      header: 'Características',
      Cell: ({ cell }) => {
        return (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {cell.getValue()?.map((char, index) => (
              <Chip key={index} label={char.name} />
            ))}
          </div>
        );
      }
    }
    
    
    
  ], []);

  return (
    <>
      <Box className="TopBar">
        <CalendarViewMonthIcon />
        <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant="subtitle2">
          Todos los clubes
        </Typography>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={myData}
      />
    </>
  );
};

export default Home;
