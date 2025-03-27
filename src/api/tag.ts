import { default as api } from '../http/index.ts';
import { replaceError } from '../util.ts';

export interface Tag {
    id: number;
    name: string;
}

export const fetchAllTags = async (): Promise<Tag[]> => {
    return api.get<unknown, Tag[]>('/tags').catch(replaceError('Failed to fetch tags'));
};

export const addTagToContent = async (contentId: number, tagId: number): Promise<void> => {
    return api.post<unknown, void>(`/content/${contentId}/tags`, { tagId })
        .catch(replaceError('Failed to add tag to content'));
};

export const deleteTagFromContent = async (contentId: number, tagId: number): Promise<void> => {
    return api.delete<unknown, void>(`/content/${contentId}/tags/${tagId}`)
        .catch(replaceError('Failed to delete tag from content'));
};

export const updateTagsForContent = async (contentId: number, tagIds: number[]): Promise<void> => {
    return api.put<unknown, void>(`/content/${contentId}/tags`, { tagIds })
        .catch(replaceError('Failed to update tags for content'));
};

export const renameTag = async (tagId: number, newName: string): Promise<Tag> => {
    return api.put<unknown, Tag>(`/tags/${tagId}/rename`, { newName })
        .catch(replaceError('Failed to rename tag'));
};

export const mergeTags = async (sourceTagId: number, targetTagId: number): Promise<void> => {
    return api.put<unknown, void>('/tags/merge', { sourceTagId, targetTagId })
        .catch(replaceError('Failed to merge tags'));
};

export const deleteTag = async (tagId: number): Promise<void> => {
    return api.delete<unknown, void>(`/tags/${tagId}`)
        .catch(replaceError('Failed to delete tag'));
};