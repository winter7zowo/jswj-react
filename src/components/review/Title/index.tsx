import { Input } from 'antd';

interface TitleProps {
    title: string;
}

function Title({ title }: TitleProps) {

    return (
        <>
            <Input
                disabled={true}
                value={title}
                style={{ margin: '10px 0 10px 0' }}>
            </Input>
        </>
    );
}

export default Title;

