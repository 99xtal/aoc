export class WordSearch {
    letters: string[][] = [];

    constructor(rawInput: string) {
        this.letters = this.parseLetters(rawInput);
    }

    countOccurrences(word: string) {
        if (this.letters.length !== this.letters[0].length) {
            throw new Error("Word search must be square");
        }

        let count = 0;
        const testPattern = new RegExp("(?=(" + word + '|' + word.split('').reverse().join('') + '))', 'g')

        const linesToCheck = [
            ...this.getHorizontals(),
            ...this.getVerticals(),
            ...this.getUpDiagonals(),
            ...this.getDownDiagonals()
        ]

        for (const line of linesToCheck) {
            const matches = (line.join('').match(testPattern) || []).length;
            count += matches;
        }

        return count;
    }

    countMasXes() {
        let count = 0;

        for (let y = 1; y < this.letters.length - 1; y++) {
            for (let x = 1; x < this.letters.length - 1; x++) {
                if (this.isMasXCenter(x, y)) {
                    count++;
                }
            }
        }

        return count;
    }

    parseLetters(input: string) {
        return input.trim().split("\n").map((line) => line.trim().split(""));
    }

    isMasXCenter(x: number, y: number) {
        const pattern = /(MAS|SAM)/g
        if (this.letters[y][x] !== 'A') {
            return false;
        }

        const upDiagStr = this.letters[y + 1][x - 1] + this.letters[y][x] + this.letters[y - 1][x + 1];
        const downDiagStr = this.letters[y - 1][x - 1] + this.letters[y][x] + this.letters[y + 1][x + 1];

        return upDiagStr.match(pattern) && downDiagStr.match(pattern);
    }

    getHorizontals() {
        return this.letters;
    }

    getVerticals() {
        const verticals = [];
        const dim = this.letters.length;

        for (let i = 0; i < dim; i++) {
            verticals.push(this.letters.map((row) => row[i]));
        }

        return verticals;
    }

    getUpDiagonals() {
        const diagonals = [];
        const dim = this.letters.length;

        for (let x = 0; x < dim; x++) {
            const diagonal = [];
            for (let y = 0; y <= x; y++) {
                diagonal.push(this.letters[y][x - y]);
            }
            diagonals.push(diagonal);
        }

        for (let y = 1; y < dim; y++) {
            const diagonal = [];
            for (let x = 0; x < dim - y; x++) {
                diagonal.push(this.letters[y + x][dim - x - 1]);
            }
            diagonals.push(diagonal);
        }

        return diagonals;
    }

    getDownDiagonals() {
        const diagonals = [];
        const dim = this.letters.length;

        for (let x = dim - 1; x >= 0; x--) {
            const diagonal = [];
            for (let y = 0; y <= dim - 1 - x; y++) {
                diagonal.push(this.letters[y][x + y]);
            }
            diagonals.push(diagonal);
        }

        for (let y = 1; y < dim; y++) {
            const diagonal = [];
            for (let x = 0; x <= dim - 1 - y; x++) {
                diagonal.push(this.letters[y + x][x]);
            }
            diagonals.push(diagonal);
        }

        return diagonals;
    }
}