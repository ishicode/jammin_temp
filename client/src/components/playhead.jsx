import { Component } from 'preact';

import Track from './track';

import './playhead.css'

export default class Playhead extends Component {
    constructor() {
        super();
        this.state = {
            // Time(in seconds) either where paused at or where playback began
            time: 0,
            // Date(in millis) when playback began, OR undefined if paused
            start: undefined,
            playing: false,
        };
        this.drag = false;
    }
    
    // Is the playhead currently playing through the tracks
    get isPlaying() { return this.state.playing; }
    set isPlaying(val) {
        // Same value
        // if (val == this.isPlaying) return;
        
        // Cancel auto-pause
        clearTimeout(this.done);
        if (val) {
            // Automatically pause when end is reached
            this.done = setTimeout(
                () => this.isPlaying = false,
                (Track.maxLength - this.time) * 1000
            );
        }
        this.setState({
            // If starting play:
            //  `this.time` getter will return where it was paused
            // If stopping play:
            //  `this.time` getter will calculate current time
            time: this.time,
            // Setting undefined might help catch bugs
            start: val ? Date.now() : undefined,
            playing: val
        });
    }

    /**
     * Get the current time. Note that the state's `time` is not reflective
     * of the actual time, use this instead.
     */
    get time() {
        if (this.isPlaying) {
            // Calculate time elapsed since began playing
            return this.state.time + (Date.now() - this.state.start) / 1000;
        }
        return this.state.time;
    }

    render = ({ }, { }) => (
        <div className="ph-body" style={this.calcAnim()}>
            <div
                className="ph-head"
                onMouseMove={(e) => this.handleDrag(e)}
                onMouseDown={(_) => this.drag = true}
                onMouseUp={(_) => this.drag = false}
                onMouseLeave={(_) => this.drag = false}
            />
        </div>
    );

    /** Dynamically creates the playhead's linear motion using CSS animations */
    calcAnim() {
        if (!this.isPlaying) {
            console.log('anim PAUSE ' + this.time)
            return `
                transition: none;
                /* Percentage in parent div where playhead remains static */
                left: ${(this.time / Track.maxLength) * 100}%;
                /* Stop animation */
                animation: none;
            `
        }
        console.log('anim PLAY ' + this.time)

        return `
            transition: none;
            /* Percentage in parent div where slide animation will start */
            --start-pos: ${(this.time / Track.maxLength) * 100}%;
            /* How long it will take to slide */
            animation: ph-slide ${Track.maxLength - this.time}s linear forwards;`;
    }

    /** @param {React.DragEvent<HTMLDivElement>} e */
    handleDrag(e) {
        if (!this.drag) return;
        e.preventDefault();

        // Stop playback
        this.isPlaying = false;

        // Enclosing div(track container)'s bounds
        const bounds = this.base.parentElement.getBoundingClientRect();
        // Percent along the parent
        const perc = (e.pageX - bounds.left) / bounds.width;
        
        this.base.style.left = `${perc * 100}%`
        this.setState(prev => ({
            ...prev,
            time: perc * Track.maxLength,
        }));
    }
}