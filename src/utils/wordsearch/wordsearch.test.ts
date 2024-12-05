import { WordSearch } from ".";

const simpleExample = `
    abc
    def
    ghi
`

const puzzleExample = `
    MMMSXXMASM
    MSAMXMSMSA
    AMXSXMAAMM
    MSAMASMSMX
    XMASAMXAMM
    XXAMMXXAMA
    SMSMSASXSS
    SAXAMASAAA
    MAMMMXMMMM
    MXMXAXMASX`

describe("WordSearch", () => {
    it("correctly counts occurances of a word", () => {
        const wordSearch = new WordSearch(puzzleExample);
        expect(wordSearch.countOccurrences("XMAS")).toBe(18);
    });

    it("correctly returns up diagonals", () => {
        const wordSearch = new WordSearch(simpleExample);
        const diagonals = wordSearch.getUpDiagonals();
        expect(diagonals).toEqual([
            ['a'],
            ['b', 'd'],
            ['c', 'e', 'g'],
            ['f', 'h'],
            ['i']
        ]);
    })

    it("correctly returns down diagonals", () => {
        const wordSearch = new WordSearch(simpleExample);
        const diagonals = wordSearch.getDownDiagonals();
        expect(diagonals).toEqual([
            ['c'],
            ['b', 'f'],
            ['a', 'e', 'i'],
            ['d', 'h'],
            ['g']
        ]);
    })

    it("correctly counts X-shaped MASes", () => {
        const wordSearch = new WordSearch(puzzleExample);
        const count = wordSearch.countMasXes();
        expect(count).toBe(9);
    })
})