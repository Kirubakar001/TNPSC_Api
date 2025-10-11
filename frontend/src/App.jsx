import { ThemeProvider } from "@/contexts/theme-context";
import { Routers } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <ThemeProvider storageKey="theme">
            <Routers />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </ThemeProvider>
    );
}

export default App;
