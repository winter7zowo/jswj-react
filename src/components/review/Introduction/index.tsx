import { Input } from 'antd';

interface IntroProps {
    intro: string;
    setIntro: (intro: string) => void;
}

function Intro({ intro, setIntro }: IntroProps) {

    return (
        <Input.TextArea
            disabled={true}
            value={intro}
            style={{ margin: '10px 0 10px 0' }}
            onChange={(value) => setIntro(value.target.value)}>
        </Input.TextArea>
    );
}

export default Intro;