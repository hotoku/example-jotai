import { atom, useAtomValue, useSetAtom } from "jotai";
import { Suspense, useState } from "react";
import "./App.css";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(() => r(), ms));
}

async function download(): Promise<number> {
  await sleep(2000);
  return Math.floor(Math.random() * 10);
}

const valAtom = atom<Promise<number> | undefined>(undefined);

const asyncAtom = atom(
  async (get) => {
    return await get(valAtom);
  },
  (_get, set, update: Promise<number>) => {
    set(valAtom, update);
  }
);

function CompA(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const setVal = useSetAtom(asyncAtom);

  return (
    <button
      disabled={loading}
      onClick={(e) => {
        e.preventDefault();
        setLoading(true);
        setVal(
          download().then((v) => {
            setLoading(false);
            return v;
          })
        );
      }}
    >
      download
    </button>
  );
}

function CompB(): JSX.Element {
  const val = useAtomValue(valAtom);
  if (val) {
    return <div>{val}</div>;
  }
  return <div>not loaded</div>;
}

function App(): JSX.Element {
  return (
    <div className="app">
      <CompA />
      <Suspense fallback={<div>loading</div>}>
        <CompB />
      </Suspense>
    </div>
  );
}

export default App;
