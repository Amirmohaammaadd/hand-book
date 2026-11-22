"use client";

import { useEffect, useRef, useState } from "react";


export default function Page() {

  type Props<T> = {
    items: T[];
    itemHeight: number;
    height: number;
    overscan?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
  };

  function VirtualList<T>({
    items,
    itemHeight,
    height,
    overscan = 3,
    renderItem,
  }: Props<T>) {
    const [scrollTop, setScrollTop] = useState(0);

    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(items.length, Math.ceil((scrollTop + height) / itemHeight) + overscan);

    return (
      <div
        style={{ height, overflowY: 'auto' }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        className="size-full flex justify-center h-screen"
      >
        {/* ارتفاع کل لیست، برای اسکرول‌بار درست */}
        <div style={{ height: items.length * itemHeight, position: 'relative' }}
        >
          {items.slice(start, end).map((item, i) => {
            const index = start + i;
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: index * itemHeight,
                  height: itemHeight,
                }}
              >
                {renderItem(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const data = Array.from({ length: 100_000 }, (_, i) => `Item ${i}`);

  return (
    <VirtualList
      items={data}
      height={400}
      itemHeight={40}
      renderItem={(item) => <div>{item}</div>}
    />
  );
}