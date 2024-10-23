export default async function getApi(link?: string, params?: string) {
    const searchBy = params ? `?search=${params}` : '';
    const url = link ? link : `https://swapi.dev/api/people/${searchBy}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        return json;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}
