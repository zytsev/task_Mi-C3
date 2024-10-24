import { useEffect } from 'react';
import './App.css';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchPeople, selectPeople } from './store/slices/peopleSlice';
import RowTable from './components/RowTable/RowTable';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import TablePaginationActions from './components/TablePagination/TablePagination';

function App() {
    const { data, loading, error } = useAppSelector(selectPeople);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPeople(null));
    }, [dispatch]);

    return (
        <div>
            {error && <h2>{error}</h2>}
            <TableContainer component={Paper} sx={{ maxWidth: 'md', margin: 'auto' }}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>Height</TableCell>
                            <TableCell align='right'>Mass</TableCell>
                            <TableCell align='right'>Gender</TableCell>
                            <TableCell align='right'>Edited</TableCell>
                            <TableCell align='right'>Vehicles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.results.map((elem) => (
                            <RowTable key={elem.name} {...elem} />
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePaginationActions />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {loading && <h2 className='loading_title'>Loading...</h2>}
        </div>
    );
}

export default App;
