import { Component } from "preact";

import Sampler from "../../util/sampler";
import Note from "../../util/note";

import './keyboard.css';

const notes = (o) => [
    new Note('C', o), new Note('Db', o), new Note('D', o),
    new Note('Eb', o), new Note('E', o), new Note('F', o),
    new Note('Gb', o), new Note('G', o), new Note('Ab', o),
    new Note('A', o), new Note('Bb', o), new Note('B', o),
]

const Key = ({ note, sampler, onPress = null, onRelease = null }) =>
    <div
        className={`kb-key-${note.color} kb-key-${note.tone} squiggly`}
        onMouseDown={() => { sampler?.triggerAttack(note.toString()); onPress(note) }}
        onMouseUp={() => { sampler?.triggerRelease(note.toString()); onRelease(note) }}
    />

const Octave = ({ octave, sampler, onPress = null, onRelease = null }) =>
    <div className="kb-octave">
        { notes(octave).map(n =>
            <Key
                note={n}
                sampler={sampler}
                onPress={onPress}
                onRelease={onRelease}
            />
        )}
    </div>

const Keyboard = ({ sampler, onPress = null, onRelease = null }, { }) =>
    <div className="kb-container">
        { [4, 5].map(o =>
            <Octave
                octave={o}
                sampler={sampler}
                onPress={onPress}
                onRelease={onRelease}
            />
        )}
    </div>

export default Keyboard;