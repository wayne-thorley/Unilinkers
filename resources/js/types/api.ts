type ListLinks = {
    active: boolean,
    label: string;
    url: string | null;
};

export type ListResponse = {
    meta: {
        current_page: number;
        from: number | null
        last_page: number;
        links: ListLinks[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
    links: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
    data: unknown;
};

export type ShowResponse = {
    data: [];
};
