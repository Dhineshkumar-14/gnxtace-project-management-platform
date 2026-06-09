import LoginPage from "./pages/LoginPage";

import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <div>
      <AppRouter />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
