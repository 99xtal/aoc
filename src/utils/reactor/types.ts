export enum SAFETY_RULE {
    ALL_ASC_OR_DESC = "ALL_ASC_OR_DESC",
    DIFF_GT_ZERO = "DIFF_GT_ZERO",
    DIFF_LT_FOUR = "DIFF_LT_FOUR",
}

export interface SafetyReport {
    safe: boolean;
    dampenedLevels: number[],
    violations: {
        pos: number;
        rule: SAFETY_RULE;
    }[];
}