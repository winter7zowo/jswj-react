import React, { useState } from 'react';
import { Button, Flex, message, Steps, theme } from 'antd';
import Review from '../review';
import http from '../../http';

const Step: React.FC = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [ReviewId, setReviewId] = useState<string>("null")

    const steps = [

        {
            title: '总体审核',
            content: <Review ReviewId={ReviewId} setReviewId={setReviewId} />,
        },
        {
            title: '事实核查',
            content: 'Second-content',
        },
        {
            title: '错字病句核查',
            content: 'Third-content',
        },
        {
            title: '内容审核',
            content: 'Last-content',
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

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
            <Steps current={current} items={items} />
            <div>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Flex gap="small" wrap>
                        <Button color="green" variant="solid" onClick={next}>Accept</Button>
                        <Button color="red" variant="solid" onClick={handleOkAndCancel}>Reject</Button>
                    </Flex>
                )}
                {current === steps.length - 1 && (
                    <Flex gap="small" wrap>
                        <Button color="green" variant="solid" onClick={handleOkAndCancel}>Accept</Button>
                        <Button color="red" variant="solid" onClick={handleOkAndCancel}>Reject</Button>
                    </Flex>
                )}
            </div>
        </>
    );
};

export default Step;