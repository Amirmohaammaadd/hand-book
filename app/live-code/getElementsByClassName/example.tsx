
import { useEffect, useRef, useState } from "react";
import getElementsByClassName from "./getElementsByClassName";

export default function App() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [result, setResult] = useState<string[]>([]);

    const handleSearch = () => {
        if (!containerRef.current) return;

        const elements = getElementsByClassName(
            containerRef.current,
            "box active"
        );

        setResult(
            elements.map((el) => el.tagName.toLowerCase() + "." + el.className)
        );
    };

    //   result : 
    //   div.box active
    //   div.box active
    //   div.box active

    return (
        <div>
            <h2>Get Elements By Class Name</h2>

            <div ref={containerRef}>
                <div className="box active">Box 1</div>
                <div className="box">Box 2</div>

                <section>
                    <div className="box active">Box 3</div>
                    <p className="active">Paragraph</p>
                </section>

                <div className="box active">Box 4</div>
            </div>

            <button onClick={handleSearch}>
                Search Elements
            </button>

            <h3>Results:</h3>

            {result.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
        </div>
    );
}
