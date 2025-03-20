import React, { useEffect, useState } from 'react';
import { Select, Space, Tag as TagComponent } from 'antd';
import { fetchAllTags, Tag } from '../api/tag';

interface TagManagerProps {
    initialTags: Tag[];
    onTagsChange: (tags: Tag[]) => void;
}

const TagManager: React.FC<TagManagerProps> = ({ initialTags, onTagsChange }) => {
    const [tags, setTags] = useState<Tag[]>(initialTags);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTags = async () => {
            try {
                const tags = await fetchAllTags();
                setAllTags(tags);
            } catch {
                setError('Failed to load tags. Please try again later.');
            }
        };
        loadTags();
    }, []);

    const addTag = (tag: Tag) => {
        if (tags.find(t => t.id === tag.id)) return;
        const updatedTags = [...tags, tag];
        setTags(updatedTags);
        onTagsChange(updatedTags);
    };

    const deleteTag = (id: number) => {
        const updatedTags = tags.filter(tag => tag.id !== id);
        setTags(updatedTags);
        onTagsChange(updatedTags);
    };

    return (
        <div>
            <h3>Manage Tags</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Space>
                {tags.map(tag => (
                    <TagComponent key={tag.id} closable onClose={() => deleteTag(tag.id)}>
                        {tag.name}
                    </TagComponent>
                ))}
            </Space>
            <Select placeholder={"添加标签Add tag"} onSelect={(id) => {
                const selectedTag = allTags.find(tag => tag.id === id);
                if (selectedTag) {
                    addTag(selectedTag);
                }
            }}>
                {allTags.filter(tag => !tags.some(t => t.id === tag.id)).map(tag => (
                    <Select.Option key={tag.id} value={tag.id}>{tag.name}</Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default TagManager;