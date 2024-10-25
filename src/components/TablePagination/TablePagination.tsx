import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPeople, selectPeople, setPage } from '../../store/slices/peopleSlice';
import styles from './tablepagination.module.css';

export default function TablePaginationActions() {
    const { data, page, searchName } = useAppSelector(selectPeople);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const count = data?.count || 0;
    const totalPages = Math.ceil(count / 10);

    const onPageChange = (newPage: number) => {
        dispatch(setPage(newPage));
        dispatch(
            fetchPeople({
                page: newPage,
                searchParam: searchName,
            })
        );
    };

    const handleFirstPageButtonClick = () => {
        onPageChange(1);
    };

    const handleBackButtonClick = () => {
        onPageChange(page - 1);
    };

    const handleNextButtonClick = () => {
        onPageChange(page + 1);
    };

    const handleLastPageButtonClick = () => {
        onPageChange(totalPages);
    };

    return (
        <td className={styles.footer_table}>
            <span className={styles.span}>{`Page:  ${page} / ${totalPages || 1}`}</span>
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton onClick={handleFirstPageButtonClick} disabled={page === 1} aria-label='first page'>
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 1} aria-label='previous page'>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton onClick={handleNextButtonClick} disabled={page >= totalPages} aria-label='next page'>
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton onClick={handleLastPageButtonClick} disabled={page >= totalPages} aria-label='last page'>
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        </td>
    );
}
