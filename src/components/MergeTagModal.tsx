import React, { useState, useEffect } from 'react';
import { Modal, Select, message } from 'antd';
import { Tag, mergeTags } from '../api/tag.ts';

interface MergeTagModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    tags: Tag[];
    sourceTag: Tag | null;
    loadTags: () => void;
    setLoading: (loading: boolean) => void;
}

const MergeTagModal: React.FC<MergeTagModalProps> = ({ visible, onOk, onCancel, tags, sourceTag, loadTags, setLoading }) => {
    const [targetTagId, setTargetTagId] = useState<number | null>(null);

    console.log(visible, targetTagId)

    useEffect(() => {
        if (!visible) {
            setTargetTagId(null);
        }
    }, [visible]);

    const handleMergeOk = async () => {
        if (sourceTag && targetTagId !== null) {
            setLoading(true);
            try {
                await mergeTags(sourceTag.id, targetTagId);
                message.success('Tags merged successfully');
                loadTags();
                onOk();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    message.error(error.message);
                } else {
                    console.error("An unknown error occurred:", error);
                    message.error('Failed to merge tags');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Modal
            title="Merge Tag"
            open={visible}
            onOk={handleMergeOk}
            onCancel={onCancel}
        >
            <Select
                prefix={sourceTag && `Merge ${sourceTag.name} to`}
                style={{ width: '100%' }}
                placeholder="Select target tag"
                value={targetTagId}
                onChange={(value: number) => setTargetTagId(value)}
            >
                {tags.map((tag) => (
                    <Select.Option key={tag.id} value={tag.id}>
                        {tag.name}
                    </Select.Option>
                ))}
            </Select>
        </Modal>
    );
};

export default MergeTagModal;