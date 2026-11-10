import { useState } from "react";

const items = [
    {
        value: "html",
        title: "HTML",
        content:
            "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    },
    {
        value: "css",
        title: "CSS",
        content:
            "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    },
    {
        value: "js",
        title: "JavaScript",
        content:
            "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    },
];

export default function Accordion() {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggle = (value: string) => {
        setOpenItems((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
        );
    };

    return (
        <div>
            {items.map((item) => {
                const isOpen = openItems.includes(item.value);

                return (
                    <div key={item.value}>
                        <div onClick={() => toggle(item.value)}>{item.title} </div>
                        <div hidden={!isOpen}>{item.content}</div>
                    </div>
                );
            })}
        </div>
    );
}
