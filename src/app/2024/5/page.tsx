"use client";

import { getPageOrderingRules, isUpdateInOrder, reorderUpdatePages } from "@/utils/printer";
import { FormEvent, useEffect, useRef, useState } from "react";

const rules = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`

const updates = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

export default function ProblemFive2024() {
    const [rulesInput, setRulesInput] = useState<string>(rules);
    const [updatesInput, setUpdatesInput] = useState<string>(updates);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const hanldleUpload = (e: FormEvent) => {
        e.preventDefault();

        const ruleset = getPageOrderingRules(rulesInput);
        const updates = updatesInput.split("\n").map(update => update.split(",").map(Number));

        const invalidUpdates = [];
        const validUpdates = [];
        for (const update of updates) {
            if (isUpdateInOrder(update, ruleset)) {
                validUpdates.push(update);
            } else {
                invalidUpdates.push(update);
            }
        }
        const middlePages = validUpdates.map(update => update[Math.floor(update.length / 2)]);
        const middlePagesSum = middlePages.reduce((acc, curr) => acc + curr, 0);
        console.log(middlePagesSum);

        const reorderedPages = invalidUpdates.map(update => reorderUpdatePages(update, ruleset));
        const reorderedMiddlePages = reorderedPages.map(update => update[Math.floor(update.length / 2)]);

        const reorderedMiddlePagesSum = reorderedMiddlePages.reduce((acc, curr) => acc + curr, 0);
        console.log(reorderedMiddlePagesSum);

        setDialogOpen(false);
    }


    const handleOutsideClick = (event: MouseEvent) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
            setDialogOpen(false);
        }
    };

    useEffect(() => {
        if (dialogOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dialogOpen]);
    
    return (
        <div className="container mx-auto">
            <h1 className="text-xl mb-4">--- Sleigh Manual Update Checker ---</h1>
            <p>
                Enter ordering rules and updates below. The ordering rules are in the format of &quot;page1|page2&quot; where page1 comes before page2. The updates are in the format of &quot;page1,page2,page3,page4,page5&quot; where the pages are the order of the update.
            </p>
            <button onClick={() => setDialogOpen(true)} className="text-greendim drop-shadow-gd">
                &#91;Upload Input&#93;
            </button>
            {dialogOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20" />}
            <dialog ref={dialogRef} open={dialogOpen} className="fixed bg-background">
                <form onSubmit={hanldleUpload}>
                    <div className="flex flex-col p-4">
                        <div className="mb-4">
                            <h1 className="text-white text-lg mb-4">--- Upload Input ---</h1>
                            <textarea
                                value={rulesInput}
                                onChange={(e) => setRulesInput(e.target.value)}
                                className="w-full h-32 border-1 border-gray-500 bg-gray-950 text-white" 
                            />
                            <textarea
                                value={updatesInput}
                                onChange={(e) => setUpdatesInput(e.target.value)}
                                className="w-full h-32 border-1 border-gray-500 bg-gray-950 text-white" 
                            />
                        </div>
                        <button type="submit" className="text-greendim drop-shadow-gd">
                            &#91;Upload&#93;
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}