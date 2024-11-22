import { eachIndexOf } from "./search";

export interface CalibrationValue {
    digit: number;
    digitAndWord: number;
}

const wordValues: Record<string, number> = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

const getNumberCalibrationValue = (line: string) => {
    let lowestIndex = null;
    let lowestValue = 0;
    let highestIndex = null;
    let highestValue = 0;

    const words = Object.keys(wordValues);
    for (const word of words) {
        const indices = eachIndexOf(line, word);

        if (indices.length > 0) {
            const value = wordValues[word];
            if (lowestIndex === null || indices[0] < lowestIndex) {
                lowestIndex = indices[0];
                lowestValue = value;
            }
            if (highestIndex === null || indices[indices.length - 1] > highestIndex) {
                highestIndex = indices[indices.length - 1];
                highestValue = value;
            }
        }
    }

    return lowestValue * 10 + highestValue;
}

const getDigitCalibrationValue = (line: string) => {
    let firstDigit = 0;
    let lastDigit = 0;
    for (const char of line) {
        if (!Number.isNaN(parseInt(char))) {
            if (firstDigit === 0) {
                firstDigit = parseInt(char);
            }
            lastDigit = parseInt(char);
        }
    }
    return firstDigit * 10 + lastDigit;
}

const getCalibrationValue = (line: string, memo: Map<string, CalibrationValue>) => {
    if (memo.has(line)) {
        return memo.get(line) as CalibrationValue;
    }

    const digitValue = getDigitCalibrationValue(line);
    const digitAndWordValue = getNumberCalibrationValue(line);
    memo.set(line, { digit: digitValue, digitAndWord: digitAndWordValue });
    return { digit: digitValue, digitAndWord: digitAndWordValue };
}

export const getCalibrationValueSums = (input: string, memo: Map<string, CalibrationValue> = new Map()): CalibrationValue => {
    let digitSum = 0;
    let digitAndWordSum = 0;
    const lines = input.split("\n");

    for (const line of lines) {
        const { digit, digitAndWord } = getCalibrationValue(line, memo);
        digitSum += digit;
        digitAndWordSum += digitAndWord;
    }
    return { digit: digitSum, digitAndWord: digitAndWordSum };
}