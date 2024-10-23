import { useEffect, useState } from 'react';
import './App.css';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchPeople, selectPeople } from './store/slices/peopleSlice';

function App() {
    const { data, loading, error } = useAppSelector(selectPeople);

    const dispatch = useAppDispatch();
    // const [dataApi, setDataApi] = useState<unknown | null>(null);
    useEffect(() => {
        dispatch(fetchPeople(null));
    }, [dispatch]);

    return (
        <div>
            {loading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {data?.count}
        </div>
    );
}

export default App;
