import { Component, RefObject, createRef } from "preact";
import * as Tone from "tone";

import { PlayButton, RecordButton } from "../components/buttons";
import Keyboard from "../components/instruments/keyboard";
import Playhead from "../components/playhead";
import Track from "../components/track";

import "./editor.css";

export default class Editor extends Component {
    /** @type {RefObject<Playhead>} The editor's playhead(manages time). */
    #playhead = createRef();
    /** @type {RefObject<Track>} The track currently being edited. */
    #track = createRef();

    constructor() {
        super();
        this.state = {
            recording: false,
            tracks: [],
            samplers: undefined,
        }
    }

    component
    async componentDidMount() {
        // TODO add support for more instruments, load the required ones.
        const piano = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            release: 1,
            baseUrl: 'https://tonejs.github.io/audio/salamander/',
        }).toDestination();
        // Wait to load...
        await Tone.loaded();

        // TODO load tracks from server
        const tracks = [[new Track.Note("C4", 10, 25)], ];

        this.setState(prev => ({
            ...prev,
            samplers: { piano },
            tracks,
        }))
    }

    render = ({ }, { recording, samplers, tracks }) => (
        <div className="editor-container">
            <div className="editor-header">
                <PlayButton onClick={() => this.togglePlaying()}/>
                <RecordButton onClick={() => this.toggleRecording()}/>
            </div>
            <div className="editor-tracks">
                <Playhead ref={this.#playhead}/>
                <Track id={0} data={[]} ref={this.#track}/>
                { tracks.map((notes, i) =>
                    <Track id={i + 1} data={notes}/>
                )}
            </div>
            <div className="editor-instrument">
                <Keyboard
                    sampler={samplers?.piano}
                    onPress={(n) => this.onInstrumentPress(n)}
                    onRelease={(n) => this.onInstrumentRelease(n)}
                />
            </div>
        </div>
    );

    /** Shorthand to get the playhead's current time. */
    get time() { return this.#playhead.current.time; }
    /** Shorthand to get whether the playhead is playing */
    get isPlaying() { return this.#playhead.current.isPlaying; }
    /** Shorthand to set whether the playhead is playing */
    set isPlaying(val) { this.#playhead.current.isPlaying = val; }

    togglePlaying() {
        this.isPlaying = !this.isPlaying;
        if (this.state.recording) {
            this.toggleRecording();
        }
    }

    toggleRecording() {
        this.isPlaying = !this.state.recording;
        this.setState({ recording: !this.state.recording })
    }

    onInstrumentPress(n) {
        if (!this.state.recording) return;

        this.#track.current?.press(n, this.time);
    }

    onInstrumentRelease(n) {
        if (!this.state.recording) return;

        this.#track.current?.release(n, this.time);
    }
}