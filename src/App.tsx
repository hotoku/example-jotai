import { atom } from "jotai";
import { useAtomValue } from "jotai";
import { Suspense } from "react";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const listAtom = atom(async () => {
  await sleep(3000);
  return ["item a", "item b", "item c"];
});

const ListMain = () => {
  const list = useAtomValue(listAtom);
  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

const App = () => (
  <Suspense fallback="loading...">
    <ListMain />
  </Suspense>
);

export default App;
