import React from "react";
import { useState } from "react";

import daisyui from "daisyui"


export default function Example() {
  const [count, setCount] = useState(0);

  return <div>
    <h1>Example</h1>
    <p>Count: {count}</p>
    <button
      className="btn"
      onClick={() => setCount(count + 1)}>Increment</button>
  </div>;
}