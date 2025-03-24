import { TextArea } from '@douyinfe/semi-ui';

interface IntroProps {
    intro: string;
    setIntro: (intro: string) => void;
}

function Intro({ intro, setIntro }: IntroProps) {

    return (
        <TextArea
            disabled={true}
            value={intro}
            style={{ margin: '10px 0 10px 0' }}
            showClear
            onChange={(value: string) => setIntro(value)}>

        </TextArea>
    );
}

export default Intro;