import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
