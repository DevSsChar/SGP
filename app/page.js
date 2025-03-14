import Image from "next/image";
import Link from "next/link";
// import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-[hsla(221,83%,53%,0.05)]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-background"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_forwards]"
            >
              <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-[hsla(221,83%,53%,0.1)] text-[hsla(221,83%,53%,1)]">
                AI-Powered Career Guidance
              </div>
            </div>
            <div 
              className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_100ms_forwards]"
            >
              <h1 className="text-4xl md:text-6xl font-medium mb-6">
                Discover Your Perfect <span className="text-[hsla(221,83%,53%,1)]">Career Path</span>
              </h1>
            </div>
            <div 
              className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_200ms_forwards]"
            >
              <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-3xl mx-auto">
                Our AI-driven platform analyzes your skills, interests, and experience to provide personalized career recommendations and learning opportunities.
              </p>
            </div>
            <div 
              className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_300ms_forwards]"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  className="px-8 py-3 rounded-md bg-[hsla(221,83%,53%,1)] text-white hover:bg-[hsla(221,83%,53%,0.9)] transition-colors flex items-center justify-center gap-2 font-medium" 
                  href="/profile"
                >
                  Get Started
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-arrow-right"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="px-8 py-3 rounded-md bg-[#dee9f5] text-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="py-20 bg-[hsla(221,83%,53%,0.05)]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_forwards]">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">How PathFinder Works</h2>
            </div>
            <div className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_100ms_forwards]">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive process ensures you receive the most relevant and personalized career guidance.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_200ms_forwards]">
              <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-sm transition-all duration-300 hover:scale-104 hover:shadow-lg hover:bg-white/80 h-full">
                <div className="p-6">
                  <div className="rounded-full w-12 h-12 bg-[hsla(221,83%,53%,0.1)] flex items-center justify-center mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-6 w-6 text-[hsla(221,83%,53%,1)]">
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                      <path d="M22 10v6"></path>
                      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Aptitude Assessment</h3>
                  <p className="text-muted-foreground">AI-powered tools analyze your natural talents and preferences to identify your strengths.</p>
                </div>
              </div>
            </div>
            <div className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_300ms_forwards]">
              <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-sm transition-all duration-300 hover:scale-104 hover:shadow-lg hover:bg-white/80 h-full">
                <div className="p-6">
                  <div className="rounded-full w-12 h-12 bg-[hsla(221,83%,53%,0.1)] flex items-center justify-center mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search h-6 w-6 text-[hsla(221,83%,53%,1)]">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Interest Mapping</h3>
                  <p className="text-muted-foreground">We capture your aspirations and interests to ensure career recommendations align with your passions.</p>
                </div>
              </div>
            </div>
            <div className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_400ms_forwards]">
              <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-sm transition-all duration-300 hover:scale-104 hover:shadow-lg hover:bg-white/80 h-full">
                <div className="p-6">
                  <div className="rounded-full w-12 h-12 bg-[hsla(221,83%,53%,0.1)] flex items-center justify-center mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase h-6 w-6 text-[hsla(221,83%,53%,1)]">
                      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Skill Analysis</h3>
                  <p className="text-muted-foreground">Your current abilities and experiences are evaluated to identify your position in potential career paths.</p>
                </div>
              </div>
            </div>
            <div className="opacity-0 translate-y-4 animate-[fade-in-up_400ms_ease-out_500ms_forwards]">
              <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-sm transition-all duration-300 hover:scale-104 hover:shadow-lg hover:bg-white/80 h-full">
                <div className="p-6">
                  <div className="rounded-full w-12 h-12 bg-[hsla(221,83%,53%,0.1)] flex items-center justify-center mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb h-6 w-6 text-[hsla(221,83%,53%,1)]">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                      <path d="M9 18h6"></path>
                      <path d="M10 22h4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">Personalized Roadmap</h3>
                  <p className="text-muted-foreground">Receive a tailored career progression plan with specific learning opportunities to help you advance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
