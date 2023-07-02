import { atom, useAtom } from "jotai";
import { Suspense } from "react";
import "./App.css";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function download(): Promise<number[]> {
  await sleep(1500);
  return [1, 2, 3];
}

const listAtom = atom([1, 2, 3]);
const wrappedListAtom = atom(
  (get) => {
    return get(listAtom);
  },
  async (get, set) => {
    const x = await download();
    const v = get(listAtom);
    const ret: number[] = [];
    for (let i in x) {
      ret.push(x[i] + v[i]);
    }
    set(listAtom, ret);
  }
);

const ListMain = () => {
  const [list, setList] = useAtom(wrappedListAtom);
  return (
    <div className="app">
      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await setList();
        }}
      >
        update
      </button>
    </div>
  );
};

const App = () => (
  <Suspense fallback="loading...">
    <ListMain />
  </Suspense>
);

export default App;
