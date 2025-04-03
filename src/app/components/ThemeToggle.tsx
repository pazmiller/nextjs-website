//components/ThemeToggle.tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle()
{
    const { theme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState( false );

    useEffect( () =>
    {
        setMounted( true );
    }, [] );

    const toggleTheme = () =>
    {
        setTheme( theme === "light" ? "dark" : "light" );
    }

    return (
        <button onClick={toggleTheme} className="text-black dark:text-white">
            {mounted &&
                ( theme === "light" ? "Dark Mode 黑夜模式" : "Light Mode 日间模式" )}
        </button>
    )

}