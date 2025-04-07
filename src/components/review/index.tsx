import { Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { FontSizeOutlined, AlignLeftOutlined, FileOutlined } from '@ant-design/icons';
import Title from './title';
import http from '../../http';
import Content from './content';
import Files from './files';

interface ArtifactData extends Artifact {
    title: string;
    intro: string;
    files: []
}

interface ReviewProps {
    reviewId: string;
    reviewStep: number;
}

function Review({ reviewId, reviewStep }: ReviewProps) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {

        http.get(`/contents/${reviewId}/get`)
            .then((res) => {
                const response = res as unknown as ArtifactData;
                console.log('res', response);
                setTitle(response.title);
                setContent(response.intro);
            })
            .catch(error => message.error(`Failed to get artifact: ${error.message}`))

        // 测试数据
        setTitle('灵感菇灵感菇')
        setContent('咕咕嘎嘎咕咕嘎嘎咕咕嘎嘎咕咕嘎嘎咕咕嘎嘎咕咕嘎嘎咕咕嘎嘎咕咕嘎嘎哎哟我滴妈哎哟我滴妈哎哟我滴妈哎哟我滴妈哎哟我滴妈')

    }, [])

    const renderStepContent = () => {
        switch (reviewStep) {
            case 1:
                return (
                    <>
                        <div style={{ margin: '20px 0' }}>
                            <Tag color="blue" icon={<FontSizeOutlined />}>Title</Tag>
                            <Title title={title} />
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <Tag color="blue" icon={<AlignLeftOutlined />}>Content</Tag>
                            <Content content={content} />
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <Tag color="blue" icon={<FileOutlined />}>Files</Tag>
                            <Files reviewId={reviewId} />
                        </div>
                    </>
                );
            case 2:
                return (
                    <div style={{ margin: '20px 0' }}>
                        <Tag color="blue" icon={<FontSizeOutlined />}>Title</Tag>
                        <Title title={title} />
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <>
            {renderStepContent()}
        </>
    );
}

export default Review;