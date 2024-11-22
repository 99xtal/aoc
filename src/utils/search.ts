const computeLPS = (pattern: string) => {
    const lps = new Array(pattern.length).fill(0);

    let j = 0;
    for (let i = 1; i < pattern.length; i++) {
        while (j > 0 && pattern[i] !== pattern[j]) {
            j = lps[j - 1];
        }

        if (pattern[i] === pattern[j]) {
            lps[i] = j++;
        }

        lps[i] = j;
    }

    return lps;
}

const kmpSearch = (text: string, pattern: string) => {
    const matchIndices = [];
    const lps = computeLPS(pattern);

    let i = 0;
    let j = 0;

    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;

            if (j === pattern.length) {
                matchIndices.push(i - j);
                j = lps[j - 1];
            }
        } else {
            if (j === 0) {
                i++;
            } else {
                j = lps[j - 1];
            }
        }
    }

    return matchIndices;
};

export const eachIndexOf = (text: string, pattern: string) => {
    return kmpSearch(text, pattern);
}