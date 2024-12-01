import { getLocationsTotalDistance, getSimilarityScore } from ".";

describe('getLocationsTotalDistance', () => {
    it('should return the total distance between two locations', () => {
        const left = [3, 4, 2, 1, 3, 3];
        const right = [4, 3, 5, 3, 9, 3];
        const result = getLocationsTotalDistance(left, right);
        expect(result).toBe(11);
    });
})

describe('getSimilarityScore', () => {
    it('should return the similarity score between two lists', () => {
        const left = [3, 4, 2, 1, 3, 3];
        const right = [4, 3, 5, 3, 9, 3];
        const result = getSimilarityScore(left, right);
        expect(result).toBe(31);
    });
})