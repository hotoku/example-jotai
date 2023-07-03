import { Suspense } from "react";
import "./App.css";

function CompA(): JSX.Element {
  return <button>download</button>;
}

function CompB(): JSX.Element {
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
