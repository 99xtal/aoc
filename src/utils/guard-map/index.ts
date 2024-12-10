import { Direction, Position, vecAdd, vecIsEqual } from "../vector";
import { DIR_DOWN, DIR_RIGHT, DIR_UP, GUARD_CHAR, OBST_CHAR, PathNode } from "./types";

export class GuardMap {
    map: string[][];
    startPos: Position;
    height: number;
    width: number;
    obstacles: Position[];

    constructor(rawInput: string) {
        this.map = [];
        this.startPos = { x: -1, y: -1 };
        this.obstacles = [];

        const rows: string[][] = [];

        rawInput.split("\n").forEach((line, y) => {
            const row: string[] = [];

            line.split("").forEach((char, x) => {
                row.push(char);

                if (char === GUARD_CHAR) {
                    this.startPos = { x, y };
                } else if (char === OBST_CHAR) {
                    this.obstacles.push({ x, y })
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

        while (this.isInBounds(currPos)) {
            visit(currPos, dir);
            const [nextPos, nextDir] = this.next(currPos, dir);

            currPos = nextPos;
            dir = nextDir;
        }
    }

    next(currPos: Position, currDir: Direction) {
        let nextDir = currDir;
        let nextPos = vecAdd(currPos, nextDir);

        if (this.charAt(nextPos) === OBST_CHAR) {
            while (this.charAt(nextPos) === OBST_CHAR) {
                nextDir = turnRight(nextDir);
                nextPos = vecAdd(currPos, nextDir);
            }
        }
        
        return [nextPos, nextDir];
    }

    charAt(p: Position) {
        if (!this.isInBounds(p)) {
            return undefined;
        }

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

export function countPossibleLoopObstructions(guardMap: GuardMap) {
    const path: PathNode[] = [];
    const possibleMap: Record<string, boolean> = {};

    guardMap.walk((p, dir) => {
        path.push({
            pos: p,
            dir: dirStr(dir),
        })

        // if you turned right here, would you eventually get back on the path, or go OOB?
        let altDir = turnRight(dir);
        let altPos = vecAdd(p, altDir);
        while (guardMap.isInBounds(altPos)) {
            const isInOriginalPath = !!path.find((pathNode) => vecIsEqual(altPos, pathNode.pos) && pathNode.dir === dirStr(turnRight(dir)));
            if (isInOriginalPath) {
                const possiblePos = vecAdd(p, dir)
                const hash = possiblePos.x + ',' + possiblePos.y;
                possibleMap[hash] = true;
                break;
            }

            const [nextPos, nextDir] = guardMap.next(altPos, altDir);
            altPos = nextPos;
            altDir = nextDir;
        }
    })

    return Object.keys(possibleMap).length;
}

export function turnRight(currDir: Direction): Direction {
    return {
        x: currDir.y === 0 ? 0 : -currDir.y,
        y: currDir.x
    }
}

function dirStr(dir: Direction) {
    if (vecIsEqual(dir, DIR_UP)) {
        return 'up';
    } else if (vecIsEqual(dir, DIR_RIGHT)) {
        return 'right';
    } else if (vecIsEqual(dir, DIR_DOWN)) {
        return 'down';
    } else {
        return 'left'
    }
}