interface PageOrderingRule {
    isBefore: number[]
    isAfter: number[]
}

type OrderingRuleset = Map<number, PageOrderingRule>;

export const getPageOrderingRules = (rules: string): OrderingRuleset => {
    const ruleMap = new Map<number, PageOrderingRule>();

    for (const rule of rules.split("\n")) {
        const [page1, page2] = rule.split("|").map(Number);

        if (!ruleMap.has(page1)) {
            ruleMap.set(page1, { isBefore: [page2], isAfter: [] });
        } else {
            ruleMap.get(page1)!.isBefore.push(page2);
        }

        if (!ruleMap.has(page2)) {
            ruleMap.set(page2, { isBefore: [], isAfter: [page1] });
        } else {
            ruleMap.get(page2)!.isAfter.push(page1);
        }
    }

    return ruleMap;
}

export const isUpdateInOrder = (update: number[], rules: OrderingRuleset): boolean => {
    const updatePageLocations: Record<number, number> = {};
    for (let i = 0; i < update.length; i++) {
        updatePageLocations[update[i]] = i;
    }

    for (const page of update) {
        const pageRules = rules.get(page);
        if (!pageRules) {
            continue;
        }

        for (const afterPage of pageRules.isBefore) {
            if (updatePageLocations[afterPage] < updatePageLocations[page]) {
                return false;
            }
        }

        for (const beforePage of pageRules.isAfter) {
            if (updatePageLocations[beforePage] > updatePageLocations[page]) {
                return false;
            }
        }
    }

    return true;
}

export const reorderUpdatePages = (update: number[], rules: OrderingRuleset): number[] => {
    const sortedUpdate = [...update];
    sortedUpdate.sort((a, b) => {
        const aRules = rules.get(a);
        const bRules = rules.get(b);

        if (!aRules || !bRules) {
            return 0;
        }

        const aBeforeB = aRules.isBefore.includes(b) && bRules.isAfter.includes(a);
        const bBeforeA = bRules.isBefore.includes(a) && aRules.isAfter.includes(b);

        if (aBeforeB) {
            return -1;
        } else if (bBeforeA) {
            return 1;
        } else {
            return 0;
        }
    });

    return sortedUpdate;
}
