export const GUARD_CHAR = '^';
export const OBST_CHAR = '#';

export type Vector = {
    x: number;
    y: number;
}

export type Position = Vector;
export type Direction = Vector;

export const DIR_UP = { x: 0, y: -1 };
export const DIR_RIGHT = { x: 1, y: 0 };
export const DIR_DOWN = { x: 0, y: 1 };
export const DIR_LEFT = { x: -1, y: 0 };