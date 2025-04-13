// Importamos React y hooks necesarios
import { React, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// Importamos nuestra instancia personalizada de Axios (con baseURL configurada)
import AxiosInstance from './Axios';
import { useNavigate, useParams } from 'react-router';


// Componente que muestra mensajes visuales (éxito, error, etc.)
import Message from './forms/Message';

const Delete = () => {

  const MyParameter = useParams()
  const MyId = MyParameter.id

  // Hook de navegación para redirigir tras guardar
  const navigate = useNavigate();

  const [message, setMessage] = useState();


  const [myData, setMyData] = useState({
    name: '',
    description: '',
    attendance: 0,
    city: '',
    country: '',
    league: '',
    characteristic: []
  });

  console.log("My data", myData);


  const GetData = () => {
    // Obtenemos datos del club
    AxiosInstance.get(`clubs/${MyId}/`)
      .then((res) => {
        setMyData(res.data);
      })
      .catch((error) => {
        console.error('Error al obtener el club:', error);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  const DeleteRecord = (event) => {
    event.preventDefault()
    AxiosInstance.delete(`clubs/${MyId}/`)
      .then(() => {
        // Mostramos mensaje de éxito
        setMessage(
          <Message
            messageText={"Club eliminado con exito!!!"}
            messagecolor={"green"}
          />
        );
        // Redirigimos después de 1.5 segundos
        setTimeout(() => {
          navigate('/')
        }, 1500);
      })
  }

  return (
    <>
      <form onSubmit={DeleteRecord}>
        {message}
        <Box>
          {/* Barra superior con título */}
          <Box className="TopBar">
            <HighlightOffIcon />
            <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant="subtitle2">
              Eliminar club
            </Typography>
          </Box>

          <Box className={"TextBox"}>
            <Typography>
              Quieres eliminar al club <strong>{myData.name}</strong> de <strong>{myData.city}</strong>??
            </Typography>
          </Box>

          {/* Botón para eliminar el club */}
          <Box sx={{ marginTop: '30px' }}>
            <Button type='submit' variant="contained" color="error" fullWidth>
              Eliminar Club
            </Button>
          </Box>
        </Box>
      </form>
    </>

  );
};

export default Delete;
