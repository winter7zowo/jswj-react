import { List, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { apiConfig } from '../../../config';

interface FileProps {
    reviewId: string;
}

function Files({ reviewId }: FileProps) {

    const files = []
    const handleDownload = (file: UploadFile) => {
        const downloadUrl = `${apiConfig.avatarURL}/files/${reviewId}/download/${file.uid}`;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name || 'file';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <List
            dataSource={files}
            renderItem={(file) => (
                <List.Item
                    actions={[
                        <Button
                            type="link"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownload(file)}
                        >
                            下载
                        </Button>,
                    ]}
                >
                    <List.Item.Meta
                        title={file.name}
                        description={`大小: ${(file.size! / 1024).toFixed(2)} KB`}
                    />
                </List.Item>
            )}
        />
    );
}

export default Files;