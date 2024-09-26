'use client'
import React, {useEffect, useState} from "react";
import {useCtx} from "@/app/layout";
import {useRef} from "react";
import {useRouter} from "next/navigation";

type TGridResponse = {
    status: boolean;
    grid: { alive: boolean }[][];
};
export default function Home() {
    const [buttons, setButtons] = useState({
        generateField: false,
        generateData: false,
        start: false,
    });

    const {size, setSize, setGrid} = useCtx()
    const router = useRouter();
    const refWidth = useRef<HTMLInputElement>(null)
    const refHeight = useRef<HTMLInputElement>(null)


    function submitButton(event: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault()
        if (refWidth.current?.value && refHeight.current?.value) {
            const size = {
                width: Number(refWidth.current.value),
                height: Number(refHeight.current.value)
            }
            setSize(size)
        }
        const newButtons= {
            ...buttons,
            generateField: true,
        }
        setButtons(newButtons)
    }
function create() {
    fetch('http://localhost:4000/api/setsize/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            size
        })
    }).then(res => res.json()).then((created)=>{
        if (created) {
            const newButtons= {
                ...buttons,
                generateData: true,
            }
            setButtons(newButtons)
        }
    })
}

    function start() {
        fetch('http://localhost:4000/api/create/').then(res => res.json() as Promise<TGridResponse>)
            .then((response: TGridResponse )=>{
            if (response.status) {
                setGrid(response.grid)
                const newButtons= {
                    ...buttons,
                    start: true,
                }
                setButtons(newButtons)
            }
        })
    }
    function go() {
        router.push(`/grid`)
    }

    useEffect(() => {
    }, [size])
    return (
        <div className="main">
            <form onSubmit={submitButton} className="form">
                <p>По умолчанию размеры 190*90</p>
                <input  placeholder="190" className='input' id="width" ref={refWidth}/>
                <label key="width">Задайте ширину</label>
                <input placeholder="90" className='input' id="height" ref={refHeight}/>
                <label key="widht">Задайте высоту</label>
                <button className="btn" type="submit">Задайте размеры</button>
            </form>
            <div className="btns">
                <button disabled={!buttons.generateField} className="btn" onClick={create}>Сгенерируйте поле</button>
                <button disabled={!buttons.generateData} className="btn"onClick={start}>Задайте стартовые данные</button>
                <button disabled={!buttons.start} className="btn" onClick={go}>Поехали</button>
            </div>

        </div>
    )
}


