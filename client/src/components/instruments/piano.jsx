import { Component } from 'preact';
import pianoC2 from '../../assets/piano_C2.wav';

export default class Piano extends Component {
    componentDidMount = async () => {
        // Load the piano note sound
        const sfx = await this.props.ctx.load(pianoC2);
        // Later will make the piano functional
        this.setState({ sfx })
    }
    render = ({ ctx }, { sfx = null }) => (
        <>
            {
                ['C', 'C#', 'D', 'D#', 'E'].map((n, i) =>
                <button onClick={() => {
                    sfx?.detune.value = i * 100;
                    ctx.play(sfx);
                }}>{n}</button>
                )
            }
        </>
    );
}