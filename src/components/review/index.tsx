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

function Review() {
    const [reviewId, setReviewId] = useState<string>("1")

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

    const submit = () => {

        http.post(`/contents/1/review`)
            .then(() => {
                message.success('Successfully uploaded! :)');
                clearData();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => message.error(`Failed to upload artifact: ${error.message}`)
            )
    };

    const handleOkAndCancel = () => {
        submit();
    }

    function clearData() {
        setTitle('');
        setIntro('');
    }


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

            <Flex gap="small" wrap>
                <Button color="green" variant="solid" onClick={handleOkAndCancel}>Accept</Button>
                <Button color="red" variant="solid" onClick={handleOkAndCancel}>Reject</Button>
            </Flex>


        </>
    );
}

export default Review;