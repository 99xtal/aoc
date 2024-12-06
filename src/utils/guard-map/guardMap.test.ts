import { countDistinctPositions, GuardMap, turnRight90 } from "."
import { DIR_DOWN, DIR_LEFT, DIR_RIGHT, DIR_UP } from "./types"

export const exampleMap = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

describe('turnRight90', () => {
    it('returns correct next direction', () => {
        const testCases = [
            { curr: DIR_UP, next: DIR_RIGHT },
            { curr: DIR_RIGHT, next: DIR_DOWN },
            { curr: DIR_DOWN, next: DIR_LEFT },
            { curr: DIR_LEFT, next: DIR_UP },
        ];

        for (const testCase of testCases) {
            const nextDir = turnRight90(testCase.curr)

            expect(nextDir.x).toBe(testCase.next.x);
            expect(nextDir.y).toBe(testCase.next.y);
        }

    })
})

describe('GuardMap', () => {
    it('returns correct OOB check', () => {
        const map = new GuardMap(exampleMap);
        expect(map.isInBounds({ x: 7, y: 10 })).toBe(false);
    })
})

describe('countDistinctPositions', () => {
    it('returns correct count', () => {
        const map = new GuardMap(exampleMap);
        expect(countDistinctPositions(map)).toBe(41)
    })
})