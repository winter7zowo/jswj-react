import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, message, Space } from 'antd';
import { Tag, fetchAllTags, renameTag, deleteTag } from '../api/tag.ts';

const ManageTagPage: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentTag, setCurrentTag] = useState<Tag | null>(null);
    const [newTagName, setNewTagName] = useState<string>('');

    useEffect(() => {
        loadTags();
    }, []);

    const loadTags = async () => {
        setLoading(true);
        try {
            const tags = await fetchAllTags();
            setTags(tags);
        } catch {
            message.error('Failed to load tags');
        } finally {
            setLoading(false);
        }
    };

    const handleRename = (tag: Tag) => {
        setCurrentTag(tag);
        setNewTagName(tag.name);
        setIsModalVisible(true);
    };

    const handleDelete = async (tagId: number) => {
        setLoading(true);
        try {
            await deleteTag(tagId);
            message.success('Tag deleted successfully');
            loadTags();
        } catch (error: unknown) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                console.error("An unknown error occurred:", error);
                message.error('Failed to delete tag');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOk = async () => {
        if (currentTag) {
            setLoading(true);
            try {
                await renameTag(currentTag.id, newTagName);
                message.success('Tag renamed successfully');
                loadTags();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    message.error(error.message);
                } else {
                    console.error("An unknown error occurred:", error);
                    message.error('Failed to rename tag');
                }
            } finally {
                setLoading(false);
                setIsModalVisible(false);
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: Tag) => (
                <Space>
                    <Button type="link" onClick={() => handleRename(record)}>
                        Rename
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Manage Tags</h1>
            <Table
                dataSource={tags}
                columns={columns}
                rowKey="id"
                loading={loading}
            />
            <Modal
                title="Rename Tag"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default ManageTagPage;