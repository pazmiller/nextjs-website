//components/ThemeToggle.tsx
"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <button onClick={toggleTheme} className="text-black dark:text-white">
            {theme === "light" ? "Dark Mode 黑夜模式" : "Light Mode 日间模式"}
        </button>
    )

}