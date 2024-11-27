import { getCalibrationValueSums } from ".";

const example = `
    two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen
`;

describe('getCalibrationValueSums', () => {
    it('should return the correct calibration value', () => {
        const { digit, digitAndWord } = getCalibrationValueSums(example);
        expect(digit).toEqual(209);
        expect(digitAndWord).toEqual(281);
    });
})