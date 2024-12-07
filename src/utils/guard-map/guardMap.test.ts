import { countDistinctPositions, GuardMap, turnRight, vecIsEqual } from "."
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

describe('turnRight', () => {
    it('returns correct next direction', () => {
        const testCases = [
            { curr: DIR_UP, next: DIR_RIGHT },
            { curr: DIR_RIGHT, next: DIR_DOWN },
            { curr: DIR_DOWN, next: DIR_LEFT },
            { curr: DIR_LEFT, next: DIR_UP },
        ];

        for (const testCase of testCases) {
            const nextDir = turnRight(testCase.curr)

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

    it('returns correct next position', () => {
        const map = new GuardMap(exampleMap);
        const [nextPos, nextDir] = map.next({ x: 4, y: 1 }, DIR_UP);
        expect(nextPos.x).toBe(5)
        expect(nextPos.y).toBe(1);
        expect(vecIsEqual(nextDir, DIR_RIGHT)).toBe(true);
    })
})

describe('countDistinctPositions', () => {
    it('returns correct count', () => {
        const map = new GuardMap(exampleMap);
        expect(countDistinctPositions(map)).toBe(41)
    })
})