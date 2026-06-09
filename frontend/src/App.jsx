import LoginPage from "./pages/LoginPage";

import { Toaster } from "sonner";
function App() {
  return (
    <div>
      <LoginPage /> <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
