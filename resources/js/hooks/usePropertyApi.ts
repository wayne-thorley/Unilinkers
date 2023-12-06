import { AxiosResponse } from 'axios';
import { useHttp } from '../context';
import {
    DestroyPropertyInput,
    ListPropertyResponse,
    ShowPropertyInput,
    ShowPropertyResponse,
    StorePropertyInput,
    UpdatePropertyInput,
} from '../types/property';

function usePropertyApi() {
    const { http } = useHttp();

    return {
        listProperty: (): Promise<AxiosResponse<ListPropertyResponse>> => http( {
            method: 'GET',
            url: '/property',
        } ),
        showProperty: (
            { id }: ShowPropertyInput,
        ): Promise<AxiosResponse<ShowPropertyResponse>> => http( {
            method: 'GET',
            url: `/property/${ id }`,
        } ),
        storeProperty: (
            data: StorePropertyInput,
        ): Promise<AxiosResponse<ShowPropertyResponse>> => http( {
            method: 'POST',
            url: '/property',
            data,
        } ),
        updateProperty: (
            { id, ...rest }: UpdatePropertyInput,
        ): Promise<AxiosResponse<ShowPropertyResponse>> => http( {
            method: 'PUT',
            url: `/property/${ id }`,
            data: rest,
        } ),
        destroyProperty: (
            { id }: DestroyPropertyInput,
        ): Promise<AxiosResponse<Record<string, never>>> => http( {
            method: 'PUT',
            url: `/property/${ id }`,
        } ),
    };
}

export default usePropertyApi;
