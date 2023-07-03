import { atom, useAtomValue } from "jotai";
import { Suspense } from "react";
import "./App.css";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(() => r(), ms));
}

const valAtom = atom<number | undefined>(undefined);

const asyncAtom = atom(async (get) => {
  await sleep(2000);
  return 0;
});

function CompA(): JSX.Element {
  return <button>download</button>;
}

function CompB(): JSX.Element {
  const val = useAtomValue(valAtom);
  if (val) {
    return <div>{val}</div>;
  }
  return <div>not loaded</div>;
}

function CompC(): JSX.Element {
  const val = useAtomValue(asyncAtom);
  return <div>{val}</div>;
}

function App(): JSX.Element {
  return (
    <div className="app">
      <CompA />
      <Suspense fallback={<div>loading</div>}>
        <CompB />
      </Suspense>
      <Suspense fallback={<div>loading</div>}>
        <CompC />
      </Suspense>
    </div>
  );
}

export default App;
