/**
 * Meta of a musical note, ie. on a piano keyboard
 */
export default class Note {
    /**
     * Create a new note from its string representation
     * @param {string} str
     */
    constructor(str, octave = undefined) {
        str = str.trim();
        
        // Parse the tone('A'-'G'), where ID = 0 is 'C'
        switch (this.tone = str.charAt(0).toUpperCase()) {
            case 'C':
                this.id = 0; break;
            case 'D':
                this.id = 2; break;
            case 'E':
                this.id = 4; break;
            case 'F':
                this.id = 5; break;
            case 'G':
                this.id = 7; break;
            case 'A':
                this.id = 9; break;
            case 'B':
                this.id = 11; break;
            default:
                throw new `Excepted tone ([A-G]|[a-g])! Got ${this.tone}.`
        }
        str = str.substring(1);

        // Parse accidental, and modify ID too
        switch (str.charAt(0)) {
            case '♮':
                this.semitone = '';
                break;
            case '#':
            case '♯':
                this.id = (this.id + 1) % 12;
                str = str.substring(1);
                this.semitone = '#';
                break;
            case 'b':
            case '♭':
                this.id = (((this.id - 1) % 12) + 12) % 12;
                str = str.substring(1);
                this.semitone = 'b';
                break;
            default:
                this.semitone = '';
                break;
        }
        // Parse octave number
        this.octave = parseInt(str);
        // Doing it this way catches `NaN` in case `parseInt` failed
        if (!(this.octave >= 0 && this.octave <= 10)) {
            if (str.length > 0) {
                throw new `Expected octave number 0-10! Got ${str}.`;
            }
            this.octave = octave || 4; // provided or default
        }
        if (octave && this.octave !== octave) {
            throw new `Two octaves were provided! ${this.octave} and ${octave}.`
        }
        this.id += (this.octave) * 12
        if (this.id < 0 || this.id > 127) {
            throw new `ID for ${this} is out of MIDI range(0-127)!`;
        }
    }

    static #isBlack = [false, true, false, true, false, false, true, false, true, false, true, false];

    get isBlack() { return Note.#isBlack[this.id % 12]; }
    get isWhite() { return !this.isBlack; }
    get color() { return this.isBlack ? 'black' : 'white'; }

    toString() { return `${this.tone}${this.semitone}${this.octave}` }
    hashCode() { return this.id; }
}