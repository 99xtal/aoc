interface Instructions {
    operation: 'multiply' | 'do' | "don't",
    values: number[],
}

const allOperators = /(mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\))/g

export const scanCorruptedMemory = (memory: string): Instructions[] => {
    const statements: Instructions[] = [];

    const matches = memory.match(allOperators);
    if (!matches) return statements;

    for (const match of matches) {
        if (match.toString().includes('do()')) {
            statements.push({
                operation: 'do',
                values: [],
            });
        } else if (match.toString().includes("don't()")) {
            statements.push({
                operation: "don't",
                values: [],
            });
        } else {
            const values = match.toString().match(/[0-9]+/g);
            if (values) {
                statements.push({
                    operation: 'multiply',
                    values: values.map(Number),
                });
            }
        }
    }

    return statements;
}

export const executeInstructions = (instructions: Instructions[], options = { ignoreDos: true }): number => {
    let sum = 0;
    let enabled = true;

    for (const instruction of instructions) {
        if (instruction.operation === 'do' && !options.ignoreDos) {
            enabled = true;
        } else if (instruction.operation === "don't" && !options.ignoreDos) {
            enabled = false;
        } else if (instruction.operation === 'multiply' && enabled) {
            sum += instruction.values[0] * instruction.values[1];
        }
    }

    return sum;
}