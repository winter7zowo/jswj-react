import { Button, message } from 'antd';
import { Upload } from '@douyinfe/semi-ui';
import { UploadOutlined } from '@ant-design/icons';
import http from '../../../http';
import { FileItem } from '@douyinfe/semi-ui/lib/es/upload';
import { apiConfig } from '../../../config';

interface FileProps {
    files: FileItem[];
    setFiles: (files: FileItem[]) => void;
    artifactId: number;
    setFileUploading: (fileUploading: boolean) => void;
}

function Files({ files, setFiles, artifactId, setFileUploading }: FileProps) {

    function onChange({ fileList }: { fileList: FileItem[] }) {
        const newFileList = [...fileList]
        newFileList.forEach(file => { file.preview = true })
        setFiles(newFileList);
    }

    function handleOnSuccess() {
        setFileUploading(false) // 上传完成后恢复主弹窗按钮
    }

    function beforeRemove(fileItem: FileItem): boolean | Promise<boolean> {
        if (fileItem.status !== 'success' && fileItem.status !== undefined) {
            return true;
        }
        return http.delete(`/files/${fileItem.id}`)
            .then(() => true)
            .catch(error => {
                message.error(`Failed to delete file: ${error.message}`);
                return false;
            }) as Promise<boolean>;
    }

    return (
        <Upload
            multiple
            action={`${apiConfig.avatarURL}/files/${artifactId}/upload`}
            fileName={'file'}
            fileList={files}
            maxSize={102400}
            onChange={onChange}
            onProgress={() => setFileUploading(true)}
            onSuccess={handleOnSuccess}
            beforeRemove={beforeRemove}
        >
            <Button
                style={{ margin: '10px 0 10px 0' }}
                icon={<UploadOutlined />}
            >
                点击上传（最大 100 MB）
            </Button>
        </Upload>
    );
}

export default Files;
