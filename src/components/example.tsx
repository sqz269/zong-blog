import React from "react";
import { useState } from "react";

import daisyui from "daisyui"


export default function Example() {
  const [count, setCount] = useState(0);

  return <div>
    <h1>Example</h1>
    <p>Count: {count}</p>
    <button
      className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
      onClick={() => setCount(count + 1)}>Increment</button>
  </div>;
}