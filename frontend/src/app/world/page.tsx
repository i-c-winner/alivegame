"use client"
import {Application} from "pixi.js";
import {useEffect, useRef} from "react";


function World(){

    const refNode=useRef<HTMLDivElement>(null)
    useEffect(() => {
        const app = new Application();
        app.init({ background: '#1099bb', resizeTo: window}).then(()=>refNode.current!.appendChild(app.canvas)
        );
    }, []);
    return <div ref={refNode}>
world
    </div>
}

export default World