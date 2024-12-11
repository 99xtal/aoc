import { dfs } from "../graph";
import { Position, vecAdd, Vector } from "../vector";

interface TrailNode {
    level: number;
    pos: Position;
    next?: TrailNode[];
}

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
    trails: TrailNode[];

    constructor(mapStr: string) {
        this.map = this.parseMapString(mapStr);
        this.height = this.map.length;
        this.width = this.map[0].length;
        this.trails = this.findTrails();
    }

    private parseMapString(mapStr: string): number[][] {
        return mapStr.split('\n').map((line) => line.split('').map((v) => parseInt(v)));
    }

    private findTrails(): TrailNode[] {
        const trails: TrailNode[] = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.map[y][x] === 0) {
                    const trailheadPos: Position = { x, y };
                    const trail = this.buildTrail(trailheadPos);
                    trails.push(trail);
                }
            }
        }

        return trails;
    }

    private buildTrail(pos: Position, level = 0): TrailNode {
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
                next.push(this.buildTrail(nextPos, level + 1));
            }
        }

        return {
            level,
            pos,
            next
        }
    }

    private heightAt(p: Position) {
        if (!this.isInBounds(p)) {
            return undefined;
        }

        return this.map[p.y][p.x];
    }

    private isInBounds(p: Position) {
        return p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height;
    }
}

export function scoreTrails(trails: TrailNode[]) {
    const scoreMap: Map<Position, number> = new Map();

    for (const trail of trails) {
        const peaks = getPeaks(trail);
        scoreMap.set(trail.pos, peaks.length)
    }

    return scoreMap;
}

function getPeaks(trail: TrailNode) {
    const peakMap: Record<string, TrailNode> = {};

    dfs(trail, (node) => {
        const isPeak = node.level === 9
        if (isPeak) {
            peakMap[`${node.pos.x},${node.pos.y}`] = node;
        }
    })

    const peaks = Object.values(peakMap).map(({ pos }) => pos);
    return peaks;
}

export function rateTrails(trails: TrailNode[]): Map<Position, number> {
    const ratingMap: Map<Position, number> = new Map();

    for (const trail of trails) {
        const numBranches = countBranches(trail);
        ratingMap.set(trail.pos, numBranches);
    }

    return ratingMap;
}

function countBranches(node: TrailNode): number {
    if (!node.next) {
        return 1;
    }

    let numBranches = 0;
    for (const n of node.next) {
        numBranches += countBranches(n);
    }

    return numBranches;
}