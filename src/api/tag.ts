import axios from 'axios';
import { SERVER_URL } from '../cfg.ts';

export interface Tag {
    id: number;
    name: string;
}

export const fetchAllTags = async (): Promise<Tag[]> => {
    const url = SERVER_URL + '/tags/';
    return await axios
        .get(url)
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
    const url = `${SERVER_URL}/content/${contentId}/tags`;
    return await axios
        .post(url, { tagId })
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
    const url = `${SERVER_URL}/content/${contentId}/tags/${tagId}`;
    return await axios
        .delete(url)
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
    const url = `${SERVER_URL}/content/${contentId}/tags`;
    return await axios
        .put(url, { tagIds })
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