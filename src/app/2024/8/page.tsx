"use client";

import { AntennaMap } from "@/utils/antenna-map";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function ProblemEight2024() {
    const [input, setInput] = useState<string>('');
    const [antinodeCount, setAntinoteCount] = useState<number>(0);
    const [resonantCount, setResonantCount] = useState<number>(0);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const hanldleUpload = (e: FormEvent) => {
        e.preventDefault();

        const antennaMap = new AntennaMap(input);

        setAntinoteCount(antennaMap.countUniqueAntinodes())
        setResonantCount(antennaMap.countUniqueResonantAntinodes());
        console.log(antennaMap.printAntinodes())
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
            <h1 className="text-xl mb-4">--- Satellite Antinode Finder ---</h1>
            <p>
                Instructions for Day 8
            </p>
            <button onClick={() => setDialogOpen(true)} className="text-greendim drop-shadow-gd">
                &#91;Upload Map&#93;
            </button>
            <p>{`Antinode Count: ${antinodeCount}`}</p>
            <p>{`Resonant Antinode Count: ${resonantCount}`}</p>
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