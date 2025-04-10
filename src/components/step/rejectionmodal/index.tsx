import { useState } from 'react';
import { Input, Modal, message } from 'antd';
import http from '../../../http';

function RejectionModal({ open, setOpen, reviewId }: { open: boolean, setOpen: (value: boolean) => void, reviewId: string }) {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');

    const handleOk = () => {
        setConfirmLoading(true);
        http.post(`/contents/${reviewId}/review`)
            .then(() => {
                message.success('Successfully uploaded! :)');
                setTimeout(() => {
                    window.location.reload();
                    setOpen(false);
                    setConfirmLoading(false);
                }, 2000);
            })
            .catch((error) => {
                message.error(`Failed to upload artifact: ${error.message}`)
                setConfirmLoading(false);
            })
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModalText(e.target.value);
    }

    return (
        <>
            <Modal
                title="拒绝原因"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Input placeholder="请输入拒绝原因..."
                    onChange={onChange}
                    value={modalText}
                />
            </Modal>
        </>
    );
};

export default RejectionModal;