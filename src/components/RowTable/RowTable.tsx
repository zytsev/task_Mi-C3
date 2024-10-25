import { People } from '../../assets/types';
import { TableCell, TableRow, Button } from '@mui/material';

function RowTable(props: People) {
    const { name, height, mass, gender, edited, vehicles, handleOpenModal } = props;
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component='th' scope='row'>
                {name}
            </TableCell>
            <TableCell align='right'>{height}</TableCell>
            <TableCell align='right'>{mass}</TableCell>
            <TableCell align='right'>{gender}</TableCell>
            <TableCell align='right'>{new Date(Date.parse(edited)).toDateString()}</TableCell>
            <TableCell align='right'>
                <Button onClick={() => handleOpenModal(vehicles)} variant='text' size='small' disabled={vehicles.length === 0}>
                    {vehicles.length > 0 ? 'Show' : 'None'}
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default RowTable;
