import { atom, useAtom } from "jotai";
import { Suspense, useEffect, useState } from "react";
import "./App.css";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function download(): Promise<number[]> {
  await sleep(1500);
  return [1, 2, 3];
}

const valAtom = atom<number[] | undefined>(undefined);

function Comp1(): JSX.Element {
  const [val, setVal] = useAtom(valAtom);

  useEffect(() => {
    download().then((d) => setVal(d));
  }, []);

  if (val === undefined) {
    throw nothing;
  }
  return (
    <div>
      {val.map((v) => (
        <div>{v}</div>
      ))}
    </div>
  );
}

function App(): JSX.Element {
  return (
    <div className="app">
      <Suspense>
        <Comp1 />
      </Suspense>
    </div>
  );
}

export default App;
