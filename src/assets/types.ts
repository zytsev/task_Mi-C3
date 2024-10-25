export interface People {
    name: string;
    height: string;
    mass: string;
    gender: string;
    edited: string;
    vehicles: string[];
    handleOpenModal: (arr: string[]) => void;
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
export interface Vehicle {
    name: string;
    model: string;
    manufacturer: string;
    vehicle_class: string;
}
export interface propsModal {
    handleCloseModal: () => void;
    openModal: boolean;
    dataModal: string[];
}
