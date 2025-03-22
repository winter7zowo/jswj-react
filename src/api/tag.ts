import { api } from '../cfg.ts';
import { validateResponse } from '../util.ts';

export interface Tag {
    id: number;
    name: string;
}

export const fetchAllTags = async (): Promise<Tag[]> => {
    const res = await api.get('/tags');
    validateResponse(res, 'Failed to fetch tags');
    return res.data.data;
};

export const addTagToContent = async (contentId: number, tagId: number): Promise<void> => {
    const res = await api.post(`/content/${contentId}/tags`, { tagId });
    validateResponse(res, 'Failed to add tag to content');
};

export const deleteTagFromContent = async (contentId: number, tagId: number): Promise<void> => {
    const res = await api.delete(`/content/${contentId}/tags/${tagId}`);
    validateResponse(res, 'Failed to delete tag from content');
};

export const updateTagsForContent = async (contentId: number, tagIds: number[]): Promise<void> => {
    const res = await api.put(`/content/${contentId}/tags`, { tagIds });
    validateResponse(res, 'Failed to update tags for content');
};

export const renameTag = async (tagId: number, newName: string): Promise<Tag> => {
    const res = await api.put(`/tags/${tagId}/rename`, { newName });
    validateResponse(res, 'Failed to rename tag');
    return res.data.data;
};

export const deleteTag = async (tagId: number): Promise<void> => {
    const res = await api.delete(`/tags/${tagId}`);
    validateResponse(res, 'Failed to delete tag');
};