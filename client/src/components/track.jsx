import { Component } from "preact";

import Note from "../util/note";

import './track.css';

export default class Track extends Component {
    // TODO move this elsewhere
    static get maxLength() { return 30; }

    constructor({ data = [] }) {
        super();
        this.state = { data };
        // Keep track of which notes are pressed
        this.down = new Map();
    }

    render = ({ id }, { data }) => (
        <div className="track-container squiggly" id={`track-${id}`}>
            { data.map(note => 
                <div
                    className="track-note"
                    style={
                        // Vertical axis: Not being played
                        `top: ${(1 - note.key.id / 127) * 100}%;`
                        // Horizotal axis: Time being played
                        + `left: ${(note.start / Track.maxLength) * 100}%;`
                        // Size: Duration
                        + `width: ${(note.duration / Track.maxLength) * 100}%;`
                    }
                />
            )}
        </div>
    );
    
    /**
     * Record a press event with this track.
     * @param {Note} note Note just pressed
     * @param {number} time Time, in seconds, of event
     */
    press(note, time) {
        this.down.set(note.id, time);
    }
    /**
     * Record a release event with this track.
     * @param {Note} note Note just released
     * @param {number} time Time, in seconds, of event
     */
    release(note, time) {
        if (!this.down.has(note.id)) return;

        // Trigger re-render
        this.setState(({ data }) => ({
            data: [
                ...data,
                new Track.Note(note, this.down.get(note.id), time),
            ]
        }));
        // No longer down
        this.down.delete(note.id);
    }
}

Track.Note = class {
    /**
     * @param {Note|string} key The key being played.
     * @param {number} start Start time, in seconds
     * @param {number} end End time, in seconds
     */
     constructor(key, start, end) {
        if (typeof(key) === 'string') key = new Note(key);
        
        this.key = key;
        this.start = start;
        this.end = end;

        if (start > end) {
            throw new `Track.Note assertion not met: ${start} < ${end}`;
        }
    }
    /** @returns {number} Duration of note, in seconds. */
    get duration() { return this.end - this.start; }
}