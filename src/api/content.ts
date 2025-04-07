import { default as api } from "../http";
import { replaceError } from '../util.ts';

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

export const fetchContent = async (page: number, size: number): Promise<ContentResponse | void> => {
    return api.get<unknown, ContentResponse>('/content/list', {
        params: { page, size },
    }).catch(replaceError('Failed to fetch content'));
};

export const deleteContent = async (id: number): Promise<void> => {
    return api.patch<unknown, void>(`/content/${id}/delete`)
        .catch(replaceError('Failed to delete this content'));
};

export const getAllByUser = async (username: string): Promise<ContentResponse | void> => {
    return api.get<unknown, ContentResponse>(`users/contents/by-user/${username}`, {
        params: { username },
    }).catch(replaceError('Failed to fetch content'));
}

