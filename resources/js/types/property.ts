import type { ListResponse, ShowResponse } from './api';

export type Property = {
    id: string;
    name: string;
    address: string;
    created_at: string;
    updated_at: string;
};

export type StorePropertyInput = {
    name: string;
    address: string;
};

export type UpdatePropertyInput = {
    id: string,
    name?: string;
    address?: string;
};

export type ShowPropertyInput = { id: string };

export type DestroyPropertyInput = { id: string };

export type ShowPropertyResponse = ShowResponse & { data: Property };

export type ListPropertyResponse = ListResponse & { data: Property[] };
