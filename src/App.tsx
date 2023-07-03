import { atom, useAtomValue } from "jotai";
import { Suspense } from "react";
import "./App.css";

const valAtom = atom<number | undefined>(undefined);

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
