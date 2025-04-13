// Importamos React y hooks necesarios
import { React, useState, useEffect } from 'react';

// Importamos nuestra instancia personalizada de Axios (con baseURL configurada)
import AxiosInstance from './Axios';

// Componentes de MUI (Material UI) para diseño e íconos
import { Box, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';

// Importamos nuestros formularios personalizados
import TextForm from './forms/TextForm';
import SelectForm from './forms/SelectForm';
import MultiSelectForm from './forms/MultiSelectForm';
import DescriptionForm from './forms/DescriptionForm';

// Importamos herramientas de validación
import { useFormik } from 'formik';
import * as yup from 'yup';

// Componente que muestra mensajes visuales (éxito, error, etc.)
import Message from './forms/Message';

// Hook para redirigir después de crear el club
import { useNavigate } from 'react-router';

const Create = () => {
    // Estados para almacenar los datos que vienen del backend
    const [countries, setCountry] = useState([]);
    const [leagues, setLeague] = useState([]);
    const [characteristics, setCharacteristic] = useState([]);
    const [message, setMessage] = useState();

    // Hook de navegación para redirigir tras guardar
    const navigate = useNavigate();

    // Función que llama a Django para obtener datos necesarios antes de crear el club
    const GetData = () => {
        // Obtenemos países
        AxiosInstance.get('countries/')
            .then((res) => {
                setCountry(res.data); // Guardamos en el estado
            })
            .catch((error) => {
                console.error('Error al obtener países:', error);
            });

        // Obtenemos ligas
        AxiosInstance.get('leagues/')
            .then((res) => {
                setLeague(res.data);
            })
            .catch((error) => {
                console.error('Error al obtener ligas:', error);
            });

        // Obtenemos características
        AxiosInstance.get('characteristics/')
            .then((res) => {
                setCharacteristic(res.data);
            })
            .catch((error) => {
                console.error('Error al obtener características:', error);
            });
    };

    // useEffect se ejecuta cuando se monta el componente → obtenemos los datos al cargar la vista
    useEffect(() => {
        GetData();
    }, []);

    // Esquema de validación de los campos usando Yup
    const validationSchema = yup.object({
        name: yup.string().required("Debe agregar un nombre"),
        description: yup.string().required("Debe agregar una descripción"),
        attendance: yup
            .number()
            .typeError("La asistencia debe ser un número")
            .required("Asistencia requerida"),
        characteristic: yup
            .array()
            .min(1, "Elija al menos una opción")
    });

    // Formulario con Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            attendance: '',
            city: '',
            country: '',
            league: '',
            characteristic: []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Enviamos los datos al backend usando Axios
            AxiosInstance.post('clubs/', values)
                .then(() => {
                    // Mostramos mensaje de éxito
                    setMessage(
                        <Message 
                            messageText={"Creado Correctamenet"} 
                            messagecolor={"green"} 
                        />
                    );
                    // Redirigimos después de 1.5 segundos
                    setTimeout(() => {
                        navigate('/')
                    }, 1500);
                })
                .catch((error) => {
                    // Mostramos error si algo sale mal
                    console.error("Error al crear el club:", error.response?.data || error.message);
                });
        }
    });

    // Render del formulario
    return (
        <div>
            {/* Formulario principal */}
            <form onSubmit={formik.handleSubmit}>

                {/* Barra superior con título */}
                <Box className={"TopBar"}>
                    <AddBoxIcon />
                    <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle2'>
                        Crear nuevo club
                    </Typography>
                </Box>

                {/* Mensaje de éxito o error */}
                { message }

                {/* Contenedor de todos los formularios */}
                <Box className={"FormBox"}>

                    {/* Primera columna de campos */}
                    <Box className={"FormArea"}>
                        <TextForm
                            label={"Nombre del Club"}
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <Box sx={{ marginTop: '30px' }}>
                            <TextForm
                                label={"Ciudad"}
                                name='city'
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />
                        </Box>
                        <Box sx={{ marginTop: '30px' }}>
                            <SelectForm
                                label={"La liga"}
                                options={leagues}
                                name='league'
                                value={formik.values.league}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.league && Boolean(formik.errors.league)}
                                helperText={formik.touched.league && formik.errors.league}
                            />
                        </Box>
                    </Box>

                    {/* Segunda columna */}
                    <Box className={"FormArea"}>
                        <SelectForm
                            label={"Paises"}
                            options={countries}
                            name='country'
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                        />
                        <Box sx={{ marginTop: '30px' }}>
                            <TextForm
                                label={"Asistencia"}
                                name='attendance'
                                value={formik.values.attendance}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.attendance && Boolean(formik.errors.attendance)}
                                helperText={formik.touched.attendance && formik.errors.attendance}
                            />
                        </Box>
                        <Box sx={{ marginTop: '30px' }}>
                            <MultiSelectForm
                                label={"Características"}
                                options={characteristics}
                                name='characteristic'
                                value={formik.values.characteristic}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.characteristic && Boolean(formik.errors.characteristic)}
                                helperText={formik.touched.characteristic && formik.errors.characteristic}
                            />
                        </Box>
                    </Box>

                    {/* Tercera columna con descripción */}
                    <Box className={"FormArea"}>
                        <DescriptionForm
                            label={"Descripción"}
                            rows={9}
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Box>
                </Box>

                {/* Botón para enviar el formulario */}
                <Box sx={{ marginTop: '30px' }}>
                    <Button type='submit' variant="contained" fullWidth>
                        Crear Club
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Create;
