import { Box, CircularProgress, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Vehicle, propsModal } from '../../assets/types';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '30%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleSpinner = {
    position: 'absolute',
    top: '45%',
    left: '50%',
};

export default function BasicModal(props: propsModal) {
    const { openModal, handleCloseModal, dataModal } = props;
    const [dataVehicle, setDataVehicle] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dataModal.length > 0) {
            dataModal.forEach((link) => {
                const getVehicle = async (link: string) => {
                    setLoading(true);
                    const response = await fetch(link);
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    const json = await response.json();
                    setLoading(false);
                    setDataVehicle((dataVehicle) => [...dataVehicle, json]);
                };
                getVehicle(link);
            });
        }
        return setDataVehicle([]);
    }, [dataModal]);

    return (
        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    Vehicles:
                </Typography>
                {!loading && (
                    <TableContainer component={Paper} sx={{ maxWidth: 'md', margin: 'auto' }}>
                        <Table size='small' aria-label='a dense table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Model</TableCell>
                                    <TableCell align='right'>Manufacturer</TableCell>
                                    <TableCell align='right'>Vehicle_class</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataVehicle?.map((elem) => (
                                    <TableRow key={elem.name}>
                                        <TableCell>{elem.name}</TableCell>
                                        <TableCell align='right'>{elem.model}</TableCell>
                                        <TableCell align='right'>{elem.manufacturer}</TableCell>
                                        <TableCell align='right'>{elem.vehicle_class}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {loading && <CircularProgress sx={styleSpinner} />}
            </Box>
        </Modal>
    );
}
