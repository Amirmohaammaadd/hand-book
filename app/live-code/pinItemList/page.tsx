"use client";

import { useEffect, useRef, useState } from "react";

type User = { id: number, name: string, age: number }

const products: User[] = [
  { id: 1, name: "1", age: 25 },
  { id: 2, name: "2", age: 13 },
  { id: 3, name: "3", age: 9 },
  { id: 4, name: "4", age: 5 },
  { id: 5, name: "5", age: 2 },
];

export default function Page() {

  // 1 - if a list of pinned item wanter

  // const [pinnedIds, setPinnedIds] = useState<number[]>([]);

  // const toggleItem = (id: number) => {
  //   // if the chosen item is pin, unpin it otherwise pin it and add it into the array
  //   setPinnedIds((prev) =>
  //     prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]
  //   );
  // };

  // const pinned = pinnedIds.map((id) => products.find((p) => p.id === id)!)
  // const unpinned = products.filter((p) => !pinnedIds.includes(p.id));

  // const data = [...pinned, ...unpinned];

  // --------------------------------------------------------------------------------------

  // 2 - if only one item could be pined 
  const [pinnedId, setPinnedId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setPinnedId((prev) => (prev === id ? null : id));
  };

  const pinned = products.find((p) => p.id === pinnedId);
  const unpinned = products.filter((p) => p.id !== pinnedId);
  const data = pinned ? [pinned, ...unpinned] : products;

  return (
    <div className="flex gap-5 flex-col justify-center items-center h-dvh">
      {data.map((item) => {
        // const isPinned = pinnedIds.includes(item.id);
        return (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            // className={`p-10 rounded-md max-w-20 aspect-square flex justify-center items-center cursor-pointer ${isPinned ? "bg-yellow-200" : "bg-slate-100"
            className={`p-10 rounded-md max-w-20 aspect-square flex justify-center items-center cursor-pointer ${item.id === pinnedId ? "bg-yellow-200" : "bg-slate-100"
              }`}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}