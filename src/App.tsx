import { Suspense } from "react";
import "./App.css";

function Component1(): JSX.Element {
  throw new Promise(() => {});
}

function App() {
  return (
    <Suspense fallback={<div>suspended</div>}>
      <Component1 />
    </Suspense>
  );
}

export default App;
