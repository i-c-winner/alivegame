'use client'
import React, {useEffect} from "react";
import {useCtx} from "@/app/layout";
import {useRef} from "react";
import {useRouter} from "next/navigation";


export default function Home() {
    const [startActive, setStartActive] = React.useState<boolean>(false);
    const {size, setSize} = useCtx()
    const router = useRouter();
    const refWidth = useRef<HTMLInputElement>(null)
    const refHeight = useRef<HTMLInputElement>(null)


    function submitButton(event: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault()
        console.log(refWidth.current,'curren')
        if (refWidth.current?.value && refHeight.current?.value) {
            const size = {
                width: Number(refWidth.current.value),
                height: Number(refHeight.current.value)
            }
            setSize(size)
        }
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
                console.log(created)
                if (created){
                    setStartActive(true);
                } else {
                    setStartActive(false);
                }
            }
        })
    }

    function start() {
        fetch('http://localhost:4000/api/create/').then(res => res.json()).then((response)=>{
            console.log(response)
            if (response.status) {
                router.push(`/grid`)
            }

        })

    }

    useEffect(() => {
        console.log(size, 'change ')
    }, [size])
    return (
        <div className="main">
            <form onSubmit={submitButton}>
                <input id="width" ref={refWidth}/>{size.width}
                <label key="width">Задайте ширину</label>
                <input id="height" ref={refHeight}/>
                <label key="widht">Задайте высоту</label>
                <button type="submit">Создайте поле</button>
            </form>
            <button disabled={!startActive} onClick={start}>start</button>
        </div>
    )
}


