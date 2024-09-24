'use client'
import {useEffect, useRef} from "react";

export default function Home() {
    const refDiv = useRef(null);
    // @ts-ignore
    function update(res) {
        res.forEach((row: [], indexI: number) => {
            row.forEach((cell: { alive: boolean }, indexY) => {
                if (cell.alive) {
                    console.log(indexI, indexY, cell)
                    const node = document.createElement("div")
                    node.style.position = 'absolute';
                    node.style.width = '10px';
                    node.style.height = '10px';
                    node.style.background = 'white';
                    node.style.top = `${(indexY * 10) - 5}px`;
                    node.style.left = `${(indexI * 10) - 5}px`;
                    // @ts-ignore
                    const container=document.getElementById('container');
                    container!.appendChild(node)

                }
            })
        })
    }
function start() {
         // @ts-ignore
    refDiv.current!.innerHTML= '';
    fetch('http://localhost:4000/api/grid').then(res => (res.json())).then((res) => {
update(res)
    })
}

function interval() {
        setInterval(() => {
            fetch('http://localhost:4000/api/update', {
                method: 'POST',
            }).then(res => res.json()).then((res) => {
                // @ts-ignore
                refDiv.current!.innerHTML= '';
                update(res)
            })
        }, 100)
    }
    function one() {
        fetch('http://localhost:4000/api/update', {
            method: 'POST',
        }).then(res => res.json()).then((res) => {
            // @ts-ignore
            refDiv.current!.innerHTML= '';
            update(res)
        })
    }
    function reset() {
        // @ts-ignore
        refDiv.current!.innerHTML= '';
        fetch('http://localhost:4000/api/reset').then(res => (res.json())).then((res) => {
            update(res)
        })
    }
    useEffect(() => {
        // fetch('http://localhost:4000/api/update', {
        //     method: 'POST',
        // }).then(res => res.json()).then((res) => {
        //     // @ts-ignore
        //     refDiv.current!.innerHTML= ''
        //     // update(res)
        // })

    }, []);

    return (
        <div className="cont">
            <button onClick={start}>/Start/</button>
            <button onClick={one}>/ one /</button>
            <button onClick={interval}>interval</button>
            <button onClick={reset}> / reset</button>
            <div ref={refDiv} className={'container'} id="container"></div>
        </div>
    )
}
