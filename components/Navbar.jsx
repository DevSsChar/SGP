"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react" 
import { useRef, useState, useEffect } from 'react'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return(
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-5 ${
            scrolled 
                ? 'bg-white/80 backdrop-blur-md shadow-sm' 
                : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link className="text-lg md:text-xl font-medium text-[hsla(221,83%,53%,1)] flex items-center gap-2" href="/">
            <div className="h-8 w-8 rounded-lg bg-[hsla(221,83%,53%,0.1)] flex items-center justify-center">
              <span className="text-[hsla(221,83%,53%,1)] text-lg font-bold">P</span>
            </div>
            <span className="font-medium">PathFinder</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            <Link className={`px-4 py-2 rounded-md text-sm transition-all font-medium ${
                scrolled 
                    ? 'text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                    : 'text-primary'
            }`} href="/">Home</Link>
            <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                scrolled 
                    ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`} href="/profile">Profile</Link>
            <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                scrolled 
                    ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`} href="/assessment">Assessment</Link>
            <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                scrolled 
                    ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`} href="/recommendations">Recommendations</Link>
            <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                scrolled 
                    ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`} href="/learning-path">Learning Path</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link className="py-2 px-4 text-sm rounded-md bg-[hsla(221,83%,53%,1)] text-white hover:bg-[hsla(221,83%,53%,0.9)] transition-colors" href="/profile">Get Started</Link>
            <button className="md:hidden p-2 rounded-md hover:bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>
    )
}
export default Navbar;
