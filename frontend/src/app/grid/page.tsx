'use client'
import {useCtx} from "@/app/layout";
function Page() {
const {size} = useCtx();
    const source: number[] = []
    for (let i = 0; i < size.height*size.width; i++) {
        source.push(i)
    }
console.log(size);
    return <div className="grid">
        {source.map((cell) => {
            return <div className="cell" key={cell}></div>
        })}
    </div>

}

export default Page