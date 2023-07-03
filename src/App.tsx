import { useEffect, useState } from "react";
import "./App.css";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function download(): Promise<number[]> {
  await sleep(1500);
  return [1, 2, 3];
}

function Comp(): JSX.Element {
  const [val, setVal] = useState<number[] | undefined>(undefined);

  useEffect(() => {
    download().then((d) => setVal(d));
  }, []);

  if (val === undefined) {
    return <div>loading</div>;
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
      {" "}
      <Comp />
    </div>
  );
}

export default App;
