"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLearningPathOpen, setIsLearningPathOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession()

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled, pathname]);

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/profile', label: 'Profile' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/assessment', label: 'Assessment' },
        { href: '/recommendations', label: 'Recommendations' },
        {
            href: '/learning-path',
            label: 'Learning Path',
            subItems: [
                { href: '/learning-path/courses', label: 'Courses' },
                { href: '/learning-path/resources', label: 'Resources' },
            ]
        },
    ];

    return(
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
            scrolled || pathname !== '/' 
                ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50' 
                : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              className="flex items-center gap-2.5 text-lg md:text-xl font-medium text-[hsla(221,83%,53%,1)] hover:opacity-90 transition-opacity shrink-0" 
              href="/"
            >
              <div className="h-9 w-9 rounded-xl bg-[hsla(221,83%,53%,0.1)] flex items-center justify-center">
                <span className="text-[hsla(221,83%,53%,1)] text-lg font-bold">P</span>
              </div>
              <span className="font-semibold hidden sm:inline">PathFinder</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 overflow-x-auto flex-grow justify-center mx-4">
              {navItems.map((item) => (
                <div key={item.href} className="relative group">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => setIsLearningPathOpen(!isLearningPathOpen)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                          pathname.startsWith(item.href)
                            ? 'bg-[hsla(221,83%,53%,0.1)] text-[hsla(221,83%,53%,1)]'
                            : scrolled || pathname !== '/'
                            ? 'text-gray-600 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]'
                            : 'text-gray-100 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-200 ${isLearningPathOpen ? 'rotate-180' : ''}`}
                        >
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </button>
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-1 py-2 bg-white rounded-lg shadow-lg border border-gray-100 min-w-[160px] transition-all duration-200 ${
                        isLearningPathOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}>
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[hsla(221,83%,53%,0.1)] hover:text-[hsla(221,83%,53%,1)]"
                            onClick={() => setIsLearningPathOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        pathname === item.href
                          ? 'bg-[hsla(221,83%,53%,0.1)] text-[hsla(221,83%,53%,1)]'
                          : scrolled || pathname !== '/'
                          ? 'text-gray-600 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]'
                          : 'text-gray-100 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth Buttons and Mobile Menu */}
            <div className="flex items-center gap-2 shrink-0">
              {session ? (
                <div className="flex items-center gap-2">
                  <span className="hidden xl:block py-2 px-3 text-sm font-medium rounded-lg bg-[hsla(221,83%,53%,1)] text-white truncate max-w-[150px]">
                    {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="py-2 px-3 text-sm font-medium rounded-lg text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)] transition-colors whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="py-2 px-3 text-sm font-medium rounded-lg bg-[hsla(221,83%,53%,1)] text-white hover:bg-[hsla(221,83%,53%,0.9)] transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
              )}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[hsla(221,83%,53%,0.1)] text-gray-700"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden absolute left-0 right-0 top-16 bg-white/90 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="px-4 py-3">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <React.Fragment key={item.href}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => setIsLearningPathOpen(!isLearningPathOpen)}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                            pathname.startsWith(item.href)
                              ? 'bg-[hsla(221,83%,53%,0.1)] text-[hsla(221,83%,53%,1)]'
                              : 'text-gray-700 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]'
                          }`}
                        >
                          {item.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-200 ${isLearningPathOpen ? 'rotate-180' : ''}`}
                          >
                            <path d="m6 9 6 6 6-6"/>
                          </svg>
                        </button>
                        {isLearningPathOpen && (
                          <div className="pl-4">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[hsla(221,83%,53%,0.1)] hover:text-[hsla(221,83%,53%,1)]"
                                onClick={() => {
                                  setIsLearningPathOpen(false);
                                  setIsMenuOpen(false);
                                }}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          pathname === item.href
                            ? 'bg-[hsla(221,83%,53%,0.1)] text-[hsla(221,83%,53%,1)]'
                            : 'text-gray-700 hover:text-[hsla(221,83%,53%,1)] hover:bg-[hsla(221,83%,53%,0.1)]'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    )
}
export default Navbar;
