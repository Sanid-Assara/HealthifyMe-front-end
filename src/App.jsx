import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">HealthifyMe</h1>
      </div>
    </>
  );
}

export default App;
