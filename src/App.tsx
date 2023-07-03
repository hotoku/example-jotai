import { atom, useAtom } from "jotai";
import { Suspense, useEffect, useState } from "react";
import "./App.css";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function download(): Promise<number> {
  await sleep(1500);
  return Math.floor(Math.random() * 100);
}

const valAtom = atom<number | undefined>(undefined);

function Comp1(): JSX.Element {
  const [val, setVal] = useAtom(valAtom);

  useEffect(() => {
    download().then((d) => setVal(d));
  }, []);

  if (val === undefined) {
    return <div>loading</div>;
  }
  return <div>{val}</div>;
}

function Comp2(): JSX.Element {
  return <button>download</button>;
}

function App(): JSX.Element {
  return (
    <div className="app">
      <Suspense>
        <Comp1 />
        <Comp2 />
      </Suspense>
    </div>
  );
}

export default App;
