"use client";
import React from 'react';
import Link from 'next/link';

export default function Navbar(){
    return (
        <nav>
            <ul className="text-black dark:text-white">
                <li>
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about" className = "hover:underline">
                        About
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