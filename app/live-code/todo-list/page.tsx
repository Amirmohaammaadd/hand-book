"use client"

import { useState } from "react"

export type Task = { id: number, text: string }

const Page = () => {

  const [task, setTask] = useState<Task[]>(
    [
      { id: 1, text: "amir" },
      { id: 2, text: "ali" },
      { id: 3, text: "reza" },
    ]
  )

  const [taskId, setTaskId] = useState(4)
  const [text, setText] = useState('')

  const addTask = () => {
    if (!text) return

    setTaskId(e => e + 1)
    setTask([...task, { id: taskId, text }])
    setText('')
  }

  const deletetask = (id: number) => {
    setTask(task.filter(item => item.id !== id))
  }

  return (

    <div className="flex flex-col justify-center gap-10 pt-10">

      <input
        placeholder="enter the text"
        className="w-[300px] mx-auto border-slate-200 rounded-sm border px-2"
        onChange={(e) => setText(e.target.value.trim())}
        value={text}
      />

      <button className="w-[300px] mx-auto border-slate-200 rounded-sm border px-2" onClick={addTask}>add task</button>

      <ul className="w-[300px] mx-auto border-slate-200 rounded-sm border px-2">
        {task.map((item) =>
          <li key={item.id}>
            <span>{item.text}</span>
            <button onClick={() => deletetask(item.id)}>Delete</button>
          </li>)}
      </ul>

    </div>
  )
}

export default Page