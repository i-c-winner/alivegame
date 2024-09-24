'use client'


export default function Home(props: {x:number, y:number}) {
    const {x, y}=props
    return (
        <div style={{ position: 'absolute',
            width: '10px',
            height: '10px',
            background: 'white',
            top: (y*10)-5,
            left: (x*10)-5}}>Locale</div>
    )
}
