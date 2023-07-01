import { Suspense } from "react";
import "./App.css";

function Component1(): JSX.Element {
  return (
    <div>
      <div>data is </div>
      <div>not yet</div>
      <button
        onClick={(e) => {
          e.preventDefault();
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
      <Component1 />
    </Suspense>
  );
}

export default App;
