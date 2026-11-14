import { useRef, useState } from 'react';
import './style.css'

function ProgressBar() {
  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" />
    </div>
  );
}

export default function App() {
  const [ids, setIds] = useState<number[]>([]);
  const nextId = useRef(0);

  const addBar = () => {
    const id = nextId.current++;
    setIds((prev) => [...prev, id]);
  };

  return (
    <div>
      <button onClick={addBar}>Add</button>
      {ids.map((id) => (
        <ProgressBar key={id} />
      ))}
    </div>
  );
}