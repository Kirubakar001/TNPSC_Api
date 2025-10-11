import { useTheme } from "../hooks/use-theme";

export default function SettingsPage() {
    const theme = useTheme();
    return (
        <>
            <div className="title">Settings Page</div>
        </>
    );
}
