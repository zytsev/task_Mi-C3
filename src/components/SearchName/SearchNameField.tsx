import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPeople, selectPeople, setPage, setSearchName } from '../../store/slices/peopleSlice';

function SearchNameField() {
    const dispatch = useAppDispatch();
    const { searchName } = useAppSelector(selectPeople);
    const getNames = (searchParam: string) => {
        dispatch(setSearchName(searchParam));
        dispatch(setPage(1));
        dispatch(
            fetchPeople({
                page: 1,
                searchParam: searchParam,
            })
        );
    };

    return (
        <TextField
            size='small'
            label='Search name...'
            variant='outlined'
            id='outlined-controlled'
            value={searchName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                getNames(event.target.value);
            }}
        />
    );
}

export default SearchNameField;
