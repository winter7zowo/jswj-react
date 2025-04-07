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

export const getCount = async (): Promise<number | void> => {
    return api.get<unknown, number>('/users/count').catch(replaceError('Failed to fetch count'));
}