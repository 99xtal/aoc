import { analyzeReactorLevels } from ".";
import { SAFETY_RULE } from "./types";

describe("analyzeReactorLevels", () => {
    it('recognizes safe levels', () => {
        const levelSet = [
            [7, 6, 4, 2, 1],
            [1, 3, 6, 7, 9],
        ];

        for (const levels of levelSet) {
            const report = analyzeReactorLevels(levels);

            expect(report.safe).toBe(true);
            expect(report.violations.length).toBe(0);
        }
    })

    it('flags non-increasing/decreasing rule violations', () => {
        const levelSet = [
            [1, 3, 2, 4, 5],
            [9, 8, 20, 1, 2],
        ];

        for (const levels of levelSet) {
            const report = analyzeReactorLevels(levels);

            expect(report.safe).toBe(false);
            expect(report.violations.filter(({ rule }) => rule === SAFETY_RULE.ALL_ASC_OR_DESC).length).toBeGreaterThan(0);
        }
    })

    it('flags greater than zero difference rule violations', () => {
        const levelSet = [
            [8, 6, 4, 4, 1],
        ];

        for (const levels of levelSet) {
            const report = analyzeReactorLevels(levels);

            expect(report.safe).toBe(false);
            expect(report.violations.filter(({ rule }) => rule === SAFETY_RULE.DIFF_GT_ZERO).length).toBeGreaterThan(0);
        }
    });

    it('flags less than four difference rule violations', () => {
        const levelSet = [
            [1, 2, 7, 8, 9],
            [9, 7, 6, 2, 1],
        ];

        for (const levels of levelSet) {
            const report = analyzeReactorLevels(levels);

            expect(report.safe).toBe(false);
            expect(report.violations.filter(({ rule }) => rule === SAFETY_RULE.DIFF_LT_FOUR).length).toBeGreaterThan(0);
        }
    })

    it("accounts for dampening factor", () => {
        const levels = [8, 6, 4, 4, 1];
        const report = analyzeReactorLevels(levels, { dampened: true });

        expect(report.safe).toBe(true);
        expect(report.dampenedLevels.length).toBe(1);
        expect(report.dampenedLevels[0]).toBe(2);
    });

    it("accounts for dampening factor 2", () => {
        const levels = [1, 3, 2, 4, 5];
        const report = analyzeReactorLevels(levels, { dampened: true });

        expect(report.safe).toBe(true);
        expect(report.dampenedLevels.length).toBe(1);
        expect(report.dampenedLevels[0]).toBe(1);
    });

    it("accounts for dampening factor 3", () => {
        const levels = [3, 1, 2, 3, 4, 5];
        const report = analyzeReactorLevels(levels, { dampened: true });

        expect(report.safe).toBe(true);
        expect(report.dampenedLevels.length).toBe(1);
        expect(report.dampenedLevels[0]).toBe(0);
    });
})