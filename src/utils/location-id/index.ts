// Part 1
export const getLocationsTotalDistance = (left: number[], right: number[]): number => {
    if (left.length !== right.length) {
        throw new Error("Left and right arrays must be the same length");
    }
    
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let totalDistance = 0;
    for (let i = 0; i < left.length; i++) {
        totalDistance += Math.abs(left[i] - right[i]);
    }

    return totalDistance;
}

// Part 2
export const getSimilarityScore = (keys: number[], values: number[]): number => {
    const valueFrequencies = new Map<number, number>();
    for (const value of values) {
        valueFrequencies.set(value, (valueFrequencies.get(value) || 0) + 1);
    }

    let similarityScore = 0;
    for (const key of keys) {
        if (valueFrequencies.has(key)) {
            similarityScore += key * valueFrequencies.get(key)!;
        }
    }

    return similarityScore;
}