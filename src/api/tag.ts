import { api } from '../cfg.ts';

export interface Tag {
    id: number;
    name: string;
}

export const fetchAllTags = async (): Promise<Tag[]> => {
    return await api
        .get('/tags')
        .then((res) => {
            if (res.status !== 200 || res.data.code !== 0) {
                throw new Error('Failed to fetch tags');
            }
            return res.data.data;
        })
        .catch((error) => {
            console.error('Error fetching tags:', error);
            throw new Error('Error fetching tags');
        });
};

export const addTagToContent = async (contentId: number, tagId: number): Promise<void> => {
    return await api
        .post(`/content/${contentId}/tags`, { tagId })
        .then((res) => {
            if (res.status !== 200 || res.data.code !== 0) {
                throw new Error('Failed to add tag to content');
            }
        })
        .catch((error) => {
            console.error('Error adding tag to content:', error);
            throw new Error('Error adding tag to content');
        });
};

export const deleteTagFromContent = async (contentId: number, tagId: number): Promise<void> => {
    return await api
        .delete(`/content/${contentId}/tags/${tagId}`)
        .then((res) => {
            if (res.status !== 200 || res.data.code !== 0) {
                throw new Error('Failed to delete tag from content');
            }
        })
        .catch((error) => {
            console.error('Error deleting tag from content:', error);
            throw new Error('Error deleting tag from content');
        });
};

export const updateTagsForContent = async (contentId: number, tagIds: number[]): Promise<void> => {
    return await api
        .put(`/content/${contentId}/tags`, { tagIds })
        .then((res) => {
            if (res.status !== 200 || res.data.code !== 0) {
                throw new Error('Failed to update tags for content');
            }
        })
        .catch((error) => {
            console.error('Error updating tags for content:', error);
            throw new Error('Error updating tags for content');
        });
};