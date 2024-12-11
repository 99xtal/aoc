"use client";

import { LavaMap, rateTrails, scoreTrails } from "@/utils/lava-hiking";
import { FormEvent, useEffect, useRef, useState } from "react";

const sampleInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

export default function ProblemTen2024() {
    const [input, setInput] = useState<string>(sampleInput);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const hanldleUpload = (e: FormEvent) => {
        e.preventDefault();

        const lavaMap = new LavaMap(input);
        const scoreMap = scoreTrails(lavaMap.trails);
        const ratingMap = rateTrails(lavaMap.trails);

        let scoreSum = 0;
        for (const score of scoreMap.values()) {
            scoreSum += score;
        }

        let ratingSum = 0;
        for (const rating of ratingMap.values()) {
            ratingSum += rating;
        }

        console.log('score sum: ', scoreSum);
        console.log('rating sum: ', ratingSum);

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
            <h1 className="text-xl mb-4">--- Day 10 ---</h1>
            <p>
                Instructions for Day 10
            </p>
            <button onClick={() => setDialogOpen(true)} className="text-greendim drop-shadow-gd">
                &#91;Upload Map&#93;
            </button>
            {dialogOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20" />}
            <dialog ref={dialogRef} open={dialogOpen} className="fixed bg-background">
                <form onSubmit={hanldleUpload}>
                    <div className="flex flex-col p-4">
                        <div className="mb-4">
                            <h1 className="text-white text-lg mb-4">--- Upload Map ---</h1>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
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