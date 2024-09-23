"use client"
import {Application, Assets, Sprite} from "pixi.js";
import {useEffect, useRef} from "react";


function World(){
    const refNode=useRef<HTMLDivElement>(null)
    useEffect(() => {
        const app = new Application();
        app.init({ background: '#1099bb', resizeTo: window}).then(async () => {
            refNode.current!.appendChild(app.canvas)
            const antTexture = await Assets.load('/images/ant.png');
           const ant= new Sprite(antTexture);
           ant.width=200
            ant.height=200
            app.stage.addChild(ant);
            // Center the sprite's anchor point.
            ant.anchor.set(0.5);
            // Move the sprite to the center of the screen.
            ant.x = app.screen.width / 2;
            ant.y = app.screen.height / 2;
            const ant2= new Sprite(antTexture);
            ant2.width=200
            ant2.height=200
            app.stage.addChild(ant2);
            // Center the sprite's anchor point.
            ant2.anchor.set(0.5);
            // Move the sprite to the center of the screen.
            const x=200
            let y=0

            setInterval(()=>{
                ant2.x = x;
                ant2.y = y;
                y+=2
            },20)

        });
    }, []);
    return <div ref={refNode}>
world
    </div>
}

export default World