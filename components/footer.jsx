import React from 'react';

const Footer=()=>{
    return (
        <footer className="border-t bg-background/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <a className="text-xl font-medium text-[hsla(221,83%,53%,1)] flex items-center gap-2 hover:opacity-80 transition-opacity" href="/">
                <div className="h-8 w-8 rounded-lg bg-[hsla(221,83%,53%,0.1)] flex items-center justify-center">
                  <span className="text-[hsla(221,83%,53%,1)] text-lg font-bold">P</span>
                </div>
                <span className="font-medium">PathFinder</span>
              </a>
              <p className="text-sm text-muted-foreground max-w-xs">AI-powered career guidance for students and professionals, tailored to your unique profile.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><a className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200" href="/">Home</a></li>
                <li><a className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200" href="/profile">Profile</a></li>
                <li><a className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200" href="/assessment">Assessment</a></li>
                <li><a className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200" href="/recommendations">Recommendations</a></li>
                <li><a className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200" href="/learning-path">Learning Path</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">Career Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">Industry Insights</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">Success Stories</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 PathFinder. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-[hsla(221,83%,53%,1)] transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;