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

const getCalibrationValue = (line: string): CalibrationValue => {
    let lowestIndex = null;
    let lowestValue = 0;
    let highestIndex = null;
    let highestValue = 0;
    let lowestDigitIndex = null;
    let lowestDigitValue = 0;
    let highestDigitIndex = null;
    let highestDigitValue = 0;

    const words = Object.keys(wordValues);
    for (const word of words) {
        const indices = eachIndexOf(line, word);

        if (indices.length > 0) {
            const value = wordValues[word];
            if (!Number.isNaN(word)) {
                if (lowestDigitIndex === null || indices[0] < lowestDigitIndex) {
                    lowestDigitIndex = indices[0];
                    lowestDigitValue = value;
                }
                if (highestDigitIndex === null || indices[indices.length - 1] > highestDigitIndex) {
                    highestDigitIndex = indices[indices.length - 1];
                    highestDigitValue = value;
                }
            }
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

    const digitValue = lowestDigitValue * 10 + highestDigitValue;
    const digitAndWordValue = lowestValue * 10 + highestValue;
    return { digit: digitValue, digitAndWord: digitAndWordValue };
}

const getCalibrationValueMemo = (line: string, memo: Map<string, CalibrationValue>) => {
    if (memo.has(line)) {
        return memo.get(line) as CalibrationValue;
    }

    const value = getCalibrationValue(line);
    memo.set(line, value);
    return value;
}

export const getCalibrationValueSums = (input: string, memo: Map<string, CalibrationValue> = new Map()): CalibrationValue => {
    let digitSum = 0;
    let digitAndWordSum = 0;
    const lines = input.split("\n");

    for (const line of lines) {
        const { digit, digitAndWord } = getCalibrationValueMemo(line, memo);
        digitSum += digit;
        digitAndWordSum += digitAndWord;
    }
    return { digit: digitSum, digitAndWord: digitAndWordSum };
}