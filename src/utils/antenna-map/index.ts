import { Position, vecAdd, vecSub } from "../vector";

const FREQUENCIES = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z', 'A', 'B',
    'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9',
]

type Frequency = string;
type FrequencyMap = Record<Frequency, Position[]>

export class AntennaMap {
    freqMap: FrequencyMap;
    width: number;
    height: number;

    constructor(mapStr: string) {
        this.freqMap = this.parseMapString(mapStr);

        const lines = mapStr.split('\n');
        this.height = lines.length;
        this.width = lines[0].length;
    }

    parseMapString(mapStr: string) {
        const freqMap: FrequencyMap = {};

        mapStr.split('\n').forEach((line, y) => {
            line.split('').forEach((char, x) => {
                if (FREQUENCIES.includes(char)) {
                    if (!freqMap[char]) {
                        freqMap[char] = [{ x, y }];
                    } else {
                        freqMap[char].push({ x, y })
                    }
                }
            })
        })

        return freqMap;
    }

    findAntinodes() {
        const antinodeMap: FrequencyMap = {};

        for (const [freq, satellites] of Object.entries(this.freqMap)) {
            for (let i = 0; i < satellites.length - 1; i++) {
                for (let j = i + 1; j < satellites.length; j++) {
                    const antinodes = this.getAntinodes(satellites[i], satellites[j]);

                    if (!antinodeMap[freq]) {
                        antinodeMap[freq] = antinodes;
                    } else {
                        antinodeMap[freq].push(...antinodes);
                    }
                }
            }
        }

        return antinodeMap;
    }

    findResonantAntinodes() {
        const antinodeMap: FrequencyMap = {};

        for (const [freq, satellites] of Object.entries(this.freqMap)) {
            for (let i = 0; i < satellites.length - 1; i++) {
                for (let j = i + 1; j < satellites.length; j++) {
                    const antinodes = this.getResonantAntinodes(satellites[i], satellites[j]);

                    if (!antinodeMap[freq]) {
                        antinodeMap[freq] = antinodes;
                    } else {
                        antinodeMap[freq].push(...antinodes);
                    }
                }
            }
        }

        return antinodeMap;
    }

    countUniqueAntinodes() { 
        const antinodeMap = this.findAntinodes();

        const uniqueAntinodes: Record<string, boolean> = {};

        for (const antinodes of Object.values(antinodeMap)) {
            for (const a of antinodes) {
                uniqueAntinodes[`${a.x},${a.y}`] = true;
            }
        }

        return Object.keys(uniqueAntinodes).length;
    }

    countUniqueResonantAntinodes() { 
        const antinodeMap = this.findResonantAntinodes();

        const uniqueAntinodes: Record<string, boolean> = {};

        for (const antinodes of Object.values(antinodeMap)) {
            for (const a of antinodes) {
                uniqueAntinodes[`${a.x},${a.y}`] = true;
            }
        }

        return Object.keys(uniqueAntinodes).length;
    }

    getAntinodes(s1: Position, s2: Position): Position[] {
        const antinodes: Position[] = [];
        const d1 = vecSub(s2, s1);
        const a1 = vecAdd(s1, { x: 2*d1.x, y: 2*d1.y })
        if (this.isWithinBounds(a1)) {
            antinodes.push(a1);
        }
        
        const d2 = vecSub(s1, s2);
        const a2 = vecAdd(s2, { x: 2*d2.x, y: 2*d2.y });
        if (this.isWithinBounds(a2)) {
            antinodes.push(a2);
        }

        return antinodes;
    }

    getResonantAntinodes(s1: Position, s2: Position): Position[] {
        const antinodes: Position[] = [];

        const d1 = vecSub(s2, s1);
        let a1 = vecAdd(s1, d1)
        while (this.isWithinBounds(a1)) {
            antinodes.push(a1);
            a1 = vecAdd(a1, d1);
        }

        const d2 = vecSub(s1, s2);
        let a2 = vecAdd(s2, d2);
        while (this.isWithinBounds(a2)) {
            antinodes.push(a2);
            a2 = vecAdd(a2, d2);
        }

        return antinodes;
    }

    isWithinBounds(p: Position) {
        return p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height;
    }

    printAntinodes() {
        const lines = [];

        for (let i = 0; i < this.height; i++) {
            lines.push(new Array(this.width).fill('.'));
        }

        return lines.map((line) => line.join('')).join('\n');
    }
}