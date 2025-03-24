import { Input } from '@douyinfe/semi-ui';

interface TitleProps {
    title: string;
    setTitle: (title: string) => void;
}

function Title({ title, setTitle }: TitleProps) {

    return (
        <>
            <Input
                disabled={true}
                value={title}
                style={{ margin: '10px 0 10px 0' }}
                onChange={value => setTitle(value)}>
            </Input>
        </>
    );
}

export default Title;

