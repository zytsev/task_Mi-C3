import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Data, PeopleState } from '../../assets/types';

const initialState: PeopleState = {
    data: null,
    loading: false,
    error: '',
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
        fetchPeople: create.asyncThunk<Data, string | null, { rejectValue: string }>(
            async function (link: string | null, { rejectWithValue }) {
                const url = link ? link : 'https://swapi.dev/api/people/';
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

export const { fetchPeople } = peopleSlice.actions;
export const { selectPeople } = peopleSlice.selectors;
export default peopleSlice.reducer;
