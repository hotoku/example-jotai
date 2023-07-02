import { atom, useAtom } from "jotai";
import { Suspense, useState } from "react";
import "./App.css";

async function download(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return 1;
}

const dataAtom = atom(1);
const derivedDataAtom = atom(
  async (get) => get(dataAtom),
  async (get, set) => {
    set(dataAtom, get(dataAtom) + (await download()));
  }
);

function Component1(): JSX.Element {
  console.log("render Component1");
  const [_, setClick] = useState({});
  const [data, setData] = useAtom(derivedDataAtom);
  return (
    <div>
      <div>data is </div>
      <div>{data}</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("click");
          setData();
          setClick({});
        }}
      >
        get data
      </button>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>suspended</div>}>
      <div className="app">
        <Component1 />
      </div>
    </Suspense>
  );
}

export default App;
