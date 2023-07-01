import { atom, useAtom } from "jotai";
import { Suspense } from "react";
import "./App.css";

const dataAtom = atom(1);

function Component1(): JSX.Element {
  const [data, setData] = useAtom(dataAtom);

  return (
    <div>
      <div>data is </div>
      <div>{data}</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setData((d) => d + 1);
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
