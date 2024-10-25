export interface People {
    name: string;
    height: string;
    mass: string;
    gender: string;
    edited: string;
    vehicles: string[];
}
export type Data = {
    count: number;
    next: string | null;
    previous: string | null;
    results: People[];
};
export type PeopleState = {
    data: Data | null;
    loading: boolean;
    error: string;
    page: number;
    searchName: string;
};
export interface queryType {
    page: number;
    searchParam: string;
}
