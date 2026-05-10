import { useState } from "react";

// Layout Components
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

import { Analytics } from "@vercel/analytics/next"

// Section Components
import Hero from "./components/sections/hero";
import SponsorsSection from "./components/sections/sponsors";
import About from "./components/sections/about";
import Speakers from "./components/sections/speakers";
import Committee from "./components/sections/committee";
import CallToAction from "./components/sections/callToAction";

// Page Components (standalone pages)
import AboutPage from "./components/ui/AboutPage";

// Page Components
import SchedulePage from "./components/ui/ScheduleOverlay";

// UI Components
import SpeakerModal from "./components/ui/SpeakerModal";

export default function App() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [currentPage, setCurrentPage] = useState("home"); // "home" | "schedule"

  const goToSchedule = () => {
    setCurrentPage("schedule");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSpeakers = () => {
    setCurrentPage("speakers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToTeam = () => {
    setCurrentPage("team");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToAbout = () => {
    setCurrentPage("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToHome = (sectionId) => {
    setCurrentPage("home");
    if (sectionId && sectionId !== "home") {
      // Small delay so page renders before scrolling
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

      <Analytics />

      <Navbar
        onOpenSchedule={goToSchedule}
        onOpenSpeakers={goToSpeakers}
        onOpenTeam={goToTeam}
        onOpenAbout={goToAbout}
        onNavigate={goToHome}
        currentPage={currentPage}
      />

      {currentPage === "home" && (
        <main>
          <Hero />
          <SponsorsSection />
          <About />
          <CallToAction />
        </main>
      )}

      {currentPage === "about" && (
        <AboutPage />
      )}

      {currentPage === "schedule" && (
        <SchedulePage
          onSelectSpeaker={(sp) => setSelectedSpeaker(sp)}
        />
      )}

      {currentPage === "speakers" && (
        <Speakers onSelectSpeaker={setSelectedSpeaker} />
      )}

      {currentPage === "team" && (
        <Committee />
      )}

      <Footer />

      <SpeakerModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </>
  );
}