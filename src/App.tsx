import { atom, useAtom } from "jotai";
import { Suspense } from "react";
import "./App.css";

const dataAtom = atom(1);
const derivedDataAtom = atom(
  (get) => get(dataAtom),
  (get, set, update: number) => {
    set(dataAtom, get(dataAtom) + update);
  }
);

function Component1(): JSX.Element {
  const [data, setData] = useAtom(derivedDataAtom);

  return (
    <div>
      <div>data is </div>
      <div>{data}</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setData(100);
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
