export type Equation = {
    testValue: number,
    nums: number[],
}

function getEquationSolutions(nums: number[], value = 0): number[] {
    if (nums.length === 0) {
        return [value];
    }

    return [
        ...getEquationSolutions(nums.slice(1), value + nums[0]),
        ...getEquationSolutions(nums.slice(1), value * nums[0]),
    ]
}

export function isPossibleEquationSolution(equation: Equation) {
    const possibleSolutions = getEquationSolutions(equation.nums);

    for (const solution of possibleSolutions) {
        if (solution === equation.testValue) {
            return true;
        }
    }

    return false;
}

function getConcatEquationSolutions(nums: number[], value = 0): number[] {
    if (nums.length === 0) {
        return [value];
    }

    return [
        ...getConcatEquationSolutions(nums.slice(1), value + nums[0]),
        ...getConcatEquationSolutions(nums.slice(1), value * nums[0]),
        ...getConcatEquationSolutions(nums.slice(1), parseInt(`${value}${nums[0]}`))
    ]
}

export function isPossibleConcatSolution(equation: Equation) {
    const possibleSolutions = getConcatEquationSolutions(equation.nums);

    for (const solution of possibleSolutions) {
        if (solution === equation.testValue) {
            return true;
        }
    }

    return false;
}

export function totalCalibrationResult(equations: Equation[], evalFunction: (e: Equation) => boolean) {
    return equations.reduce((sum, equation) => {
        if (evalFunction(equation)) {
            return sum + equation.testValue;
        }
        return sum;
    }, 0)
}

// input must be formatted correctly
export function parseEquationsInput(input: string): Equation[] {
    return input.trim().split("\n").map((line) => {
        const [valueStr, numsStr] = line.split(": ");
        const value = parseInt(valueStr);
        const nums = numsStr.split(' ').map(Number);

        return {
            testValue: value,
            nums,
        }
    })
}