import { Position, vecAdd, Vector } from "../vector";

interface TrailNode {
    level: number;
    pos: Position;
    next?: TrailNode[];
}

type XPos = number;
type YPos = number;

type PeakMap = Record<XPos, YPos[]>;

const searchDirs: Vector[] = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 },  // right
    { x: 0, y: 1 },  // down
    { x: -1, y: 0},  // left
]

export class LavaMap {
    map: number[][];
    height: number;
    width: number;

    constructor(mapStr: string) {
        this.map = this.parseMapString(mapStr);
        this.height = this.map.length;
        this.width = this.map[0].length;
    }

    parseMapString(mapStr: string): number[][] {
        return mapStr.split('\n').map((line) => line.split('').map((v) => parseInt(v)));
    }

    scoreTrails(): Map<Position, number> {
        const scoreMap: Map<Position, number> = new Map();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.map[y][x] === 0) {
                    const trailheadPos: Position = { x, y };
                    const peaks = this.getPeaks(trailheadPos);
                    const score = peaks.length
                    scoreMap.set(trailheadPos, score);
                }
            }
        }

        return scoreMap;
    }

    rateTrails(): Map<Position, number> {
        const ratingMap: Map<Position, number> = new Map();
        const trails = this.findTrails();

        console.log(trails);

        for (const trail of trails) {
            const numBranches = this.countBranches(trail);
            ratingMap.set(trail.pos, numBranches);
        }

        return ratingMap;
    }

    getPeaks(start: Position): Position[] {
        const peakMap = this.findPeaks(start);

        const peaks: Position[] = [];

        for (const [x, ys] of Object.entries(peakMap)) {
            for (const y of ys) {
                peaks.push({ x: parseInt(x), y });
            }
        }

        return peaks;
    }

    findPeaks(pos: Position, level = 0, reachedPeaks: PeakMap = {}): PeakMap {
        if (level === 9) {
            if (!reachedPeaks[pos.x]) {
                reachedPeaks[pos.x] = [pos.y];
            } else if (!reachedPeaks[pos.x].includes(pos.y)) {
                reachedPeaks[pos.x].push(pos.y);
            }
        }

        const searchPositions = searchDirs.map((d) => vecAdd(pos, d));
        for (const nextPos of searchPositions) {
            if (this.heightAt(nextPos) === level + 1) {
                reachedPeaks = { ...reachedPeaks, ...this.findPeaks(nextPos, level + 1, reachedPeaks)}
            }
        }

        return reachedPeaks;
    }

    findTrails(): TrailNode[] {
        const trails: TrailNode[] = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.map[y][x] === 0) {
                    const trailheadPos: Position = { x, y };
                    trails.push(this.traverseMap(trailheadPos));
                }
            }
        }

        return trails;
    }

    traverseMap(pos: Position, level = 0): TrailNode {
        if (level === 9) {
            return {
                level,
                pos,
            }
        }

        const next: TrailNode[] = [];
        const searchPositions = searchDirs.map((d) => vecAdd(pos, d));
        for (const nextPos of searchPositions) {
            if (this.heightAt(nextPos) === level + 1) {
                next.push(this.traverseMap(nextPos, level + 1));
            }
        }

        return {
            level,
            pos,
            next
        }
    }

    countBranches(node: TrailNode): number {
        if (!node.next) {
            return 1;
        }

        let numBranches = 0;
        for (const n of node.next) {
            numBranches += this.countBranches(n);
        }

        return numBranches;
    }

    heightAt(p: Position) {
        if (!this.isInBounds(p)) {
            return undefined;
        }

        return this.map[p.y][p.x];
    }

    isInBounds(p: Position) {
        return p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height;
    }
}