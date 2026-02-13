import "./Test.css";
import { useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

interface TestProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void; // добавляем пропс для обработки клика по элементу списка
}
export default function Test({ items, heading, onSelectItem }: TestProps) {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  const handleClick2 = (event: ReactMouseEvent<HTMLHeadingElement>) =>
    console.log(event);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="List-group">
        {items.map((item, index) => (
          <li
            key={index}
            className="List-group-item active"
            onClick={() => onSelectItem(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <h1 onClick={handleClick2}>Test</h1>
      <button
        style={{ border: "2px solid red" }}
        value={"button"}
        onClick={handleClick}
      >
        I'm a button ( {count} )
      </button>
    </>
  );
}
