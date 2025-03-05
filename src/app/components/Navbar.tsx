"use client";
import React from 'react';
import Link from 'next/link';

export default function Navbar(){
    return (
        <nav>
            <ul className="flex flex-row md:flex-row gap-20 text-black dark:text-white">
                <li>
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/project" className = "hover:underline">
                        Project
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:underline">
                    Contact
                    </Link>
                </li>
            </ul>
        </nav>

)            
}