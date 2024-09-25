"use client"
// import {Application, Assets, Sprite} from "pixi.js";
import {useEffect, useRef, useState} from "react";

const source: number[] = []
for (let i = 0; i < 190 * 90; i++) {
    source.push(i)
}
console.log(source)

function Page() {
    const [seizes, setSeizes] = useState({
        x: 190,
        y: 90
    });
    return <div className="grid">
        {source.map((cell) => {
            return <div className="cell" key={cell}></div>
        })}
    </div>

}

export default Page