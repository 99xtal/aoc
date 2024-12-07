interface TreeNode {
    value: number;
    add: TreeNode | null
    multiply: TreeNode | null
}

interface ConcatTreeNode {
    value: number;
    add: TreeNode | null
    multiply: TreeNode | null
    concat: TreeNode | null;
}

export type Equation = {
    testValue: number,
    nums: number[],
}

function buildOperationTree(nums: number[]) {
    return buildOperationTreeNode(nums.slice(1), nums[0]);
}

function buildOperationTreeNode(nums: number[], value = 0) {
    if (nums.length === 0) {
        return {
            value,
            add: null,
            multiply: null,
        }
    }

    const node: TreeNode = {
        value,
        add: buildOperationTreeNode(nums.slice(1), value + nums[0]),
        multiply: buildOperationTreeNode(nums.slice(1), value * nums[0])
    }

    return node;
}

function buildConcatTree(nums: number[]) {
    return buildConcatTreeNode(nums.slice(1), nums[0]);
}

function buildConcatTreeNode(nums: number[], value = 0) {
    if (nums.length === 0) {
        return {
            value,
            add: null,
            multiply: null,
            concat: null,
        }
    }

    const node: ConcatTreeNode = {
        value,
        add: buildConcatTreeNode(nums.slice(1), value + nums[0]),
        multiply: buildConcatTreeNode(nums.slice(1), value * nums[0]),
        concat: buildConcatTreeNode(nums.slice(1), parseInt(`${value}${nums[0]}`))
    }

    return node;
}

function getLeafValuesAtDepth(node: TreeNode | null, currentDepth: number, maxDepth: number): number[] {
    if (!node) {
        return []
    }
    if (currentDepth === maxDepth) {
        return [node.value]
    }

    return [
        ...getLeafValuesAtDepth(node.add, currentDepth + 1, maxDepth),
        ...getLeafValuesAtDepth(node.multiply, currentDepth + 1, maxDepth)
    ]
}

function getLeafValues(node: TreeNode, depth: number) {
    return getLeafValuesAtDepth(node, 0, depth);
}

function getConcatLeafValuesAtDepth(node: ConcatTreeNode | null, currentDepth: number, maxDepth: number): number[] {
    if (!node) {
        return []
    }
    if (currentDepth === maxDepth) {
        return [node.value]
    }

    return [
        // @ts-ignore
        ...getConcatLeafValuesAtDepth(node.add, currentDepth + 1, maxDepth),
        // @ts-ignore
        ...getConcatLeafValuesAtDepth(node.multiply, currentDepth + 1, maxDepth),
        // @ts-ignore
        ...getConcatLeafValuesAtDepth(node.concat, currentDepth + 1, maxDepth),
    ]
}

function getConcatLeafValues(node: ConcatTreeNode, depth: number) {
    return getConcatLeafValuesAtDepth(node, 0, depth);
}

function getEquationSolutions(nums: number[]) {
    const tree = buildOperationTree(nums);
    const treeDepth = nums.length - 1;
    return getLeafValues(tree, treeDepth);
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

function getConcatEquationSolutions(nums: number[]) {
    const tree = buildConcatTree(nums);
    const treeDepth = nums.length - 1;
    return getConcatLeafValues(tree, treeDepth);
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