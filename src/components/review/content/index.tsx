import { Input } from 'antd';

interface ContentProps {
    content: string;
}

function Content({ content }: ContentProps) {

    const { TextArea } = Input;

    return (
        <TextArea
            rows={10}
            disabled={true}
            value={content}
            style={{ margin: '10px 0 10px 0' }}>
        </TextArea>
    );
}

export default Content;