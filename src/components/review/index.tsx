import { Tag, message, Button, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { FontSizeOutlined, AlignLeftOutlined } from '@ant-design/icons';
import Title from './Title';
import Introduction from './Introduction';
import http from '../../http';

interface ArtifactData extends Artifact {
    title: string;
    intro: string;
    files: []
}

interface ReviewProps {
    ReviewId: string;
    setReviewId: (ReviewId: string) => void;
}

function Review({ ReviewId, setReviewId }: ReviewProps) {

    setReviewId('1');

    const [title, setTitle] = useState('');

    const [intro, setIntro] = useState('');

    useEffect(() => {
        http.get(`/contents/1/get`)
            .then((res) => {
                const response = res as unknown as ArtifactData;
                console.log('res', response);
                setTitle(response.title);
                setIntro(response.intro);
            })
            .catch(error => message.error(`Failed to get artifact: ${error.message}`))
    }, [])


    return (

        <>
            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" icon={<FontSizeOutlined />}>Title</Tag>
                <Title title={title} setTitle={setTitle} />
            </div>
            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" icon={<AlignLeftOutlined />}>Introduction</Tag>
                <Introduction intro={intro} setIntro={setIntro} />
            </div>

            {/* <div style={{ margin: '20px 0' }}>
                <Tag color="light-blue" prefixIcon={<IconPaperclip />}>Files</Tag>
                <Files files={files} setFiles={setFiles} artifactId={artifactId} setFileUploading={setFileUploading} />
            </div> */}

        </>
    );
}

export default Review;