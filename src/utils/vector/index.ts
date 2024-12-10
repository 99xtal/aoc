export type Vector = {
    x: number;
    y: number;
}

export type Position = Vector;
export type Direction = Vector;

export function vecAdd(v1: Vector, v2: Vector) {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}

export function vecSub(v1: Vector, v2: Vector) {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
}

export function vecIsEqual(v1: Vector, v2: Vector) {
    return v1.x === v2.x && v1.y === v2.y;
}