import { useState } from 'react';
import { Button, Flex, Steps, message } from 'antd';
import Review from '../review';
import RejectionModal from './rejectionmodal';
import http from '../../http';

function Step({ reviewId }: { reviewId: string }) {

    const [open, setOpen] = useState(false);

    const [current, setCurrent] = useState(0);

    const onChange = (previous: number) => {
        if (previous < current) {
            setCurrent(previous);
        }
    };

    const steps = [

        {
            title: '总体审核',
            content: <Review reviewId={reviewId} reviewStep={1} />,
            description: 'First-description',
        },
        {
            title: '事实核查',
            content: <Review reviewId={reviewId} reviewStep={2} />,
            description: 'Second-description',
        },
        {
            title: '错字病句核查',
            content: <Review reviewId={reviewId} reviewStep={3} />,
            description: 'Third-description',
        },
        {
            title: '敏感内容审核',
            content: <Review reviewId={reviewId} reviewStep={4} />,
            description: 'Last-description',
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title, description: item.description }));

    const submitWithModal = () => {
        setOpen(true)
    };

    const submit = () => {
        http.post(`/contents/${reviewId}/review`)
            .then(() => {
                message.success('Successfully uploaded! :)');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => message.error(`Failed to upload artifact: ${error.message}`)
            )
    }

    const handleOkAndCancel = () => {
        submitWithModal();
    }

    return (
        <>
            <Steps current={current}
                onChange={onChange}
                items={items} />
            <div>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Flex gap="small" wrap>
                        <Button color="green" variant="solid" onClick={() => setCurrent(current + 1)}>Accept</Button>
                        <Button color="red" variant="solid" onClick={handleOkAndCancel}>Reject</Button>
                    </Flex>
                )}
                {current === steps.length - 1 && (
                    <Flex gap="small" wrap>
                        <Button color="green" variant="solid" onClick={submit}>Accept</Button>
                        <Button color="red" variant="solid" onClick={handleOkAndCancel}>Reject</Button>
                    </Flex>
                )}
            </div>
            <RejectionModal open={open} setOpen={setOpen} reviewId={reviewId} />
        </>
    );
};

export default Step;