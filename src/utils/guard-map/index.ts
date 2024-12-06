import { DIR_DOWN, DIR_LEFT, DIR_RIGHT, DIR_UP, Direction, GUARD_CHAR, OBST_CHAR, Position, Vector } from "./types";

export class GuardMap {
    map: string[][];
    startPos: Position;
    height: number;
    width: number;
    obstPositions: Position[];

    constructor(rawInput: string) {
        this.map = [];
        this.startPos = { x: -1, y: -1 };
        this.obstPositions = [];

        const rows: string[][] = [];

        rawInput.split("\n").forEach((line, y) => {
            const row: string[] = [];

            line.split("").forEach((char, x) => {
                row.push(char);

                if (char === GUARD_CHAR) {
                    this.startPos = { x, y };
                } else if (char === OBST_CHAR) {
                    this.obstPositions.push({ x, y })
                }
            })

            rows.push(row);
        });

        this.map = rows;
        this.width = rows[0].length;
        this.height = rows.length;
    }

    walk(visit: (p: Position, dir: Direction) => void) {
        let dir = DIR_UP;
        let currPos = this.startPos;
        let nextPos = add(currPos, dir);

        while (this.isInBounds(nextPos)) {
            visit(currPos, dir);

            nextPos = add(currPos, dir);
            // hacky
            if (!this.isInBounds(nextPos)) {
                break;
            }
            if (this.charAt(nextPos) === OBST_CHAR) {
                while (this.charAt(nextPos) === OBST_CHAR) {
                    dir = turnRight(dir);
                    nextPos = add(currPos, dir);
                }
            }

            currPos = nextPos;
        }

        visit(currPos, dir);
    }

    charAt(p: Position) {
        return this.map[p.y][p.x];
    }

    isInBounds(p: Position) {
        return p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height
    }

}

export function countDistinctPositions(guardMap: GuardMap) {
    const positionMap: Record<string, boolean> = {};

    guardMap.walk((p) => {
        const hash = `${p.x},${p.y}`;
        positionMap[hash] = true;
    })

    return Object.keys(positionMap).length;
}

export function turnRight(currDir: Direction): Direction {
    return {
        x: currDir.y === 0 ? 0 : -currDir.y,
        y: currDir.x
    }
}

function add(v1: Vector, v2: Vector) {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}
