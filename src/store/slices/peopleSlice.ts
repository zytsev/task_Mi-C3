import { buildCreateSlice, asyncThunkCreator, PayloadAction } from '@reduxjs/toolkit';
import { Data, PeopleState, queryType } from '../../assets/types';

const initialState: PeopleState = {
    data: null,
    loading: false,
    error: '',
    page: 1,
    searchName: '',
};

const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    selectors: {
        selectPeople: (state) => state,
    },
    reducers: (create) => ({
        setPage: create.reducer((state, action: PayloadAction<number>) => {
            state.page = action.payload;
        }),
        setSearchName: create.reducer((state, action: PayloadAction<string>) => {
            state.searchName = action.payload;
        }),
        fetchPeople: create.asyncThunk<Data, queryType, { rejectValue: string }>(
            async function (query: queryType, { rejectWithValue }) {
                const url = `https://swapi.dev/api/people/?page=${query.page}&search=${query.searchParam}`;
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    const json = await response.json();
                    return json;
                } catch (error) {
                    if (error instanceof Error) {
                        return rejectWithValue(error.message);
                    }
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = '';
                },
                fulfilled: (state, action) => {
                    state.data = action.payload;
                },
                rejected: (state, action) => {
                    state.error = action.payload ? action.payload : '';
                },
                settled: (state) => {
                    state.loading = false;
                },
            }
        ),
    }),
});

export const { fetchPeople, setPage, setSearchName } = peopleSlice.actions;
export const { selectPeople } = peopleSlice.selectors;
export default peopleSlice.reducer;
