import { AxiosResponse } from 'axios';
import { useHttp } from '../context';
import {
    DestroyRoomInput,
    ListRoomInput,
    ListRoomResponse,
    ShowRoomInput,
    ShowRoomResponse,
    StoreRoomInput,
    UpdateRoomInput,
} from '../types/room';

function useRoomApi() {
    const { http } = useHttp();

    return {
        listRoom: (
            { property_id }: ListRoomInput,
        ): Promise<AxiosResponse<ListRoomResponse>> => http( {
            method: 'GET',
            url: '/room',
            params: { property_id },
        } ),
        showRoom: (
            { id }: ShowRoomInput,
        ): Promise<AxiosResponse<ShowRoomResponse>> => http( {
            method: 'GET',
            url: `/room/${ id }`,
        } ),
        storeRoom: (
            data: StoreRoomInput,
        ): Promise<AxiosResponse<ShowRoomResponse>> => http( {
            method: 'POST',
            url: '/room',
            data,
        } ),
        updateRoom: (
            { id, ...rest }: UpdateRoomInput,
        ): Promise<AxiosResponse<ShowRoomResponse>> => http( {
            method: 'PUT',
            url: `/room/${ id }`,
            data: rest,
        } ),
        destroyRoom: (
            { id }: DestroyRoomInput,
        ): Promise<AxiosResponse<Record<string, never>>> => http( {
            method: 'DELETE',
            url: `/room/${ id }`,
        } ),
    };
}

export default useRoomApi;
