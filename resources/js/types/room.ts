import type { ListResponse, ShowResponse } from './api';

export type Room = {
    id: string;
    property_id: string,
    name: string;
    size: string;
    created_at: string;
    updated_at: string;
};

export type ListRoomInput = {
    property_id: string;
};

export type StoreRoomInput = {
    property_id: string;
    name: string;
    size: string;
};

export type UpdateRoomInput = {
    id: string,
    name?: string;
    size?: string;
};

export type ShowRoomInput = { id: string };

export type DestroyRoomInput = { id: string };

export type ShowRoomResponse = ShowResponse & { data: Room };

export type ListRoomResponse = ListResponse & { data: Room[] };
