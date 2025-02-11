import { useState } from "react";

export function Counter() {
    const [counter, setCounter] = useState(0)

    const handleDecrement = () => {
        setCounter(prev => (prev > 0 ? prev - 1: 0))
    }

    const handleIncrement = () => {
        setCounter(prev => prev + 1)
    }

    return (
        <div>
            <button onClick={handleDecrement}>-</button>
            <span>{counter}</span>
            <button onClick={handleIncrement}>+</button>
        </div>
    )
}