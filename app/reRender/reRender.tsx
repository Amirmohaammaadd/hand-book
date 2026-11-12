"use client"

import { useState } from "react";

const Page = () => {

  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Ali' });

  console.log('render');

  // تفاوت رفرنس با مقدار. برای همینه که دومی rerender میشه چون داره ادرس جدید میده و یه obj جدید ساخته میشه با اینکه محتوا یکیه 

  return (
    <>
      <button onClick={() => setCount(0)}>count: 0 (برابر)</button>
      <button onClick={() => setUser({ name: 'Ali' })}>user: همان محتوا</button>
    </>
  );
}

export default Page