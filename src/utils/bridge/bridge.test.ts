import { Equation, isPossibleConcatSolution, isPossibleEquationSolution, parseEquationsInput, totalCalibrationResult } from ".";

export const exampleInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

describe('totalCalibrationResult', () => {
    it("correctly calculates total calibration result", () => {
        const equations = parseEquationsInput(exampleInput);
        expect(totalCalibrationResult(equations, isPossibleEquationSolution)).toBe(3749)
    })
})

describe("isPossibleEquationSolution", () => {
    it("returns true for possible solutions", () => {
        const testCases: Equation[] = [
            { testValue: 190, nums: [10, 19] },
            { testValue: 3267, nums: [81, 40, 27] },
            { testValue: 292, nums: [11, 6, 16, 20] },
        ]

        for (const equation of testCases) {
            expect(isPossibleEquationSolution(equation)).toBe(true);
        }
    })
})

describe("isPossibleConcatSolution", () =>{
    it("returns true for possible solutions", () => {
        const testCases: Equation[] = [
            { testValue: 190, nums: [10, 19] },
            { testValue: 3267, nums: [81, 40, 27] },
            { testValue: 292, nums: [11, 6, 16, 20] },
            { testValue: 156, nums: [15, 6] },
            { testValue: 7290, nums: [6, 8, 6, 15] },
            { testValue: 192, nums: [17, 8, 14] }
        ]

        for (const equation of testCases) {
            expect(isPossibleConcatSolution(equation)).toBe(true);
        }
    })
})