"use client";

import { isPossibleConcatSolution, isPossibleEquationSolution, parseEquationsInput, totalCalibrationResult } from "@/utils/bridge";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function ProblemSeven2024() {
    const [input, setInput] = useState<string>('c');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const hanldleUpload = (e: FormEvent) => {
        e.preventDefault();

        const equations = parseEquationsInput(input);
        const calibrationResult = totalCalibrationResult(equations, isPossibleEquationSolution);
        console.log(calibrationResult);

        const resultWithConcat = totalCalibrationResult(equations, isPossibleConcatSolution)
        console.log(resultWithConcat);

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
            <h1 className="text-xl mb-4">--- Bridge Calibration Value Calculator ---</h1>
            <p>
                Instructions for Day 7
            </p>
            <button onClick={() => setDialogOpen(true)} className="text-greendim drop-shadow-gd">
                &#91;Upload Equations&#93;
            </button>
            {dialogOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20" />}
            <dialog ref={dialogRef} open={dialogOpen} className="fixed bg-background">
                <form onSubmit={hanldleUpload}>
                    <div className="flex flex-col p-4">
                        <div className="mb-4">
                            <h1 className="text-white text-lg mb-4">--- Upload Equations ---</h1>
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