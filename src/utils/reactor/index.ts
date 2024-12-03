import { SAFETY_RULE, SafetyReport } from "./types";

const checkViolations = (prev: number, curr: number, asc: boolean) => {
    const violations: SAFETY_RULE[] = [];
    const diff = Math.abs(curr - prev);

    if (asc && curr < prev || !asc && curr > prev) {
        violations.push(SAFETY_RULE.ALL_ASC_OR_DESC);
    }

    if (diff > 3) {
        violations.push(SAFETY_RULE.DIFF_LT_FOUR);
    }

    if (diff < 1) {
        violations.push(SAFETY_RULE.DIFF_GT_ZERO);
    }

    return violations;
}

export const analyzeReactorLevels = (levels: number[], options = { dampened: false }): SafetyReport => {
    const report: SafetyReport = {
        safe: true,
        dampenedLevels: [],
        violations: [],
    };

    if (levels.length < 2) {
        return report;
    }

    const ascending = levels[1] > levels[0] ? true : false;

    for (let i = 1; i < levels.length; i++) {
        const prev = levels[i - 1];
        const curr = levels[i];

        const violations = checkViolations(prev, curr, ascending);
        if (violations.length > 0) {
            report.violations.push(...violations.map(rule => ({ pos: i, rule })));
            report.safe = false;
        }
    }

    if (!report.safe && options.dampened) {
        for (let i = 0; i < levels.length; i++) {
            const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
            const newReport = analyzeReactorLevels(newLevels, { dampened: false });
            if (newReport.safe) {
                report.dampenedLevels.push(i);
                report.safe = true;
                break;
            }
        }
    }

    return report;
}

export const generateSafetyReports = (input: string) => {
    const reports: Map<string, SafetyReport> = new Map();
    for (const line of input.split('\n')) {
      const matches = line.match(/[0-9]+/g);
      if (matches != null) {
        const levels = matches.map((v) => parseInt(v));
        const report = analyzeReactorLevels(levels, { dampened: true });
        reports.set(line, report);
      }
    }
  
    return reports;
}