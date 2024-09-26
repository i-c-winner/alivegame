'use client'
import {useCtx} from "@/app/layout";
import './style.css'
import {useEffect, useState} from "react";


function Page() {
    const {grid} = useCtx();
    const [source, setSource] = useState(grid);

    const {size} = useCtx();

    const style = {
        width: `${size.width * 10}px`,
        height: `${size.height * 10}px`
    }
    useEffect(() => {
        setInterval(()=>{
            fetch('http://localhost:4000/api/update/').then(res => res.json() as Promise<{alive: boolean}[][]>)
                .then((response: { alive: boolean}[][] )=>{
                        setSource(response)

                })
        }, 200)
    }, [grid]);
        return (
        <div style={style} className="grid">
            {source.map((element: { alive: boolean }[], rowIndex: number) => {
                return (
                    <div key={rowIndex} className="row">
                        {element.map((cell, cellIndex) => (
                            <div
                                className={`${cell.alive ? "cell cell_alive" : "cell cell_dead"}`}
                                key={`${rowIndex}-${cellIndex}`}
                            ></div>
                        ))}
                    </div>
                );
            })}
        </div>
        );
}

export default Page