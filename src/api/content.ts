import { api } from "../cfg";

export interface Content {
    id: number;
    title: string;
    body: string;
    tags: { name: string }[];
    createdAt: string;
    authorId: number;
    startTime: string;
    endTime: string;
}

export interface ContentResponse {
    content: Content[];
    totalElements: number;
}

export const fetchContent = async (page: number, size: number): Promise<ContentResponse> => {
    return await api
        .get('/content/list', {
            params: {
                page: page,
                size: size,
            },
        })
        .then((res) => {
            console.assert(res.status === 200);
            console.assert(res.data.code === 0);
            return res.data.data;
        })
        .catch(console.error);
};