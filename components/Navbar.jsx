"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react" 
import { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession()

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Check scroll position on mount and route change
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled, pathname]);

    return(
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
            scrolled || pathname !== '/' 
                ? 'bg-white/80 backdrop-blur-md shadow-sm' 
                : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link className="text-lg md:text-xl font-medium text-[hsla(221,83%,53%,1)] flex items-center gap-2" href="/">
              <div className="h-8 w-8 rounded-lg bg-[hsla(221,83%,53%,0.1)] flex items-center justify-center">
                <span className="text-[hsla(221,83%,53%,1)] text-lg font-bold">P</span>
              </div>
              <span className="font-medium">PathFinder</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <Link className={`px-4 py-2 rounded-md text-sm transition-all font-medium ${
                  scrolled || pathname !== '/'
                      ? 'text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                      : 'text-primary'
              }`} href="/">Home</Link>
              <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                  scrolled || pathname !== '/'
                      ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`} href="/profile">Profile</Link>
              <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                  scrolled || pathname !== '/'
                      ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`} href="/dashboard">Dashboard</Link>
              <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                  scrolled || pathname !== '/'
                      ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`} href="/assessment">Assessment</Link>
              <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                  scrolled || pathname !== '/'
                      ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`} href="/recommendations">Recommendations</Link>
              <Link className={`px-4 py-2 rounded-md text-sm transition-all ${
                  scrolled || pathname !== '/'
                      ? 'text-muted-foreground hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`} href="/learning-path">Learning Path</Link>
            </nav>
            <div className="flex items-center gap-2">
              {session ? (
                <>
                  <span className="py-2 px-4 text-sm rounded-md bg-[hsla(221,83%,53%,1)] text-white">
                    Welcome {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="py-2 px-4 text-sm rounded-md text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="py-2 px-4 text-sm rounded-md bg-[hsla(221,83%,53%,1)] text-white hover:bg-[hsla(221,83%,53%,0.9)] transition-colors"
                >
                  Sign In
                </button>
              )}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-muted text-gray-900"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu h-5 w-5 text-gray-900" data-lov-id="components/Navbar.jsx" data-lov-name="Menu" data-component-path="components/Navbar.jsx" data-component-line="88" data-component-file="Navbar.tsx" data-component-name="Menu" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden absolute left-0 right-0 top-16 bg-white/80 backdrop-blur-md border-b border-white/20 transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="px-4 py-2">
              <div className="flex flex-col space-y-1">
                <Link 
                  href="/" 
                  className="px-4 py-2 rounded-md text-sm text-gray-900 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/profile" 
                  className="px-4 py-2 rounded-md text-sm text-gray-900 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 rounded-md text-sm text-gray-900 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/assessment" 
                  className="px-4 py-2 rounded-md text-sm text-gray-900 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Assessment
                </Link>
                <Link 
                  href="/recommendations" 
                  className="px-4 py-2 rounded-md text-sm text-gray-900 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recommendations
                </Link>
                <Link 
                  href="/learning-path" 
                  className="px-4 py-2 rounded-md text-sm text-gray-900 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Learning Path
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
}
export default Navbar;
