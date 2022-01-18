import Note from "./note";

export default class Sampler {
    constructor() {
        this.samples = {};
        this.playing = new Map();
    }
    
    /**
     * Builds a new sampler from the given samples
     * @param {{Note: string}} samples Maps `Note`(or valid `string`) to URL of samples
     */
    static async load(samples) {
        const out = new Sampler();

        for (let [note, url] of Object.entries(samples)) {
            // Convert to note
            if (typeof(note) === 'string') {
                note = new Note(note);
            }
            // Load sample
            out.samples[note.id] = await Sample.load(url);
        }
        if (out.samples == {}) {
            throw new "Sampler requires at least 1 sample!";
        }
        return out;
    }

    /**
     * Play the given note with minimal sample detuning
     * @param {string|Note} note 
     */
    press(note) {
        if (typeof(note) === 'string') note = new Note(note);
        // Only care about ID
        const id = note.id;
        // Find closest sample
        let sample = null;
        let dist = Infinity;

        for (const [i, s] of Object.entries(this.samples)) {
            if (Math.abs(id - i) < Math.abs(dist)) {
                dist = id - i;
                sample = s;
            }
        }
        
        const source = sample.audioContext.createBufferSource();
        const gain = sample.audioContext.createGain();

        // Detune to target note
        source.buffer = sample.buffer;
        source.detune.value = dist * 100;
        gain.gain.value = 1.0;
        
        // Buffer -> Gain -> Speakers
        source.connect(gain);
        gain.connect(sample.audioContext.destination);

        // Release
        this.release(note);
        source.onended = () => this.release(note);

        // Attack
        this.playing.set(note.id, gain);
        source.start(0);
    }

    release(note) {
        const RELEASE_TIME = 0.15;

        if (typeof(note) === 'string') note = new Note(note);

        if (this.playing.has(note.id)) {
            this.playing
                .get(note.id)
                .gain
                .setTargetAtTime(0, Sample.ctx.currentTime, RELEASE_TIME)
            this.playing.delete(note.id);
        }
    }
}

export class Sample {
    static ctx = new (window.AudioContext || window.webkitAudioContext)()

    /**
     * @param {AudioBuffer} pcm
     */
    constructor(pcm) { this.pcm = pcm; }

    /**
     * Loads a sound sample at the given URL
     * @param {string|Promise} url Path or dynamic module import
     * @returns Loaded sample, ready to be played
     */
    static async load(url) {
        if (!url) return;
        // Allow `new Sample(import('...'))`
        if (url instanceof Promise) {
            url = (await url).default;
        }
        // Load PCM data
        const req = await fetch(url);
        const buf = await req.arrayBuffer();
        
        const pcm = await (new Promise((resolve, reject) => {
            Sample.ctx.decodeAudioData(buf, resolve, reject);
        }));
        return new Sample(pcm);
    }

    /**
     * Begins playback of this sound sample immediately
     * @param {number} detune Amount to change pitch, in cents
     */
    play(detune = 0) {
        const node = this.audioContext.createBufferSource();

        node.buffer = this.pcm;
        node.detune.value = detune;
        
        node.connect(this.audioContext.destination);
        node.start(0);
    }

    /** @returns {AudioContext} */
    get audioContext() { return Sample.ctx; }
    /** @returns {AudioBuffer} */
    get buffer() { return this.pcm; }
}