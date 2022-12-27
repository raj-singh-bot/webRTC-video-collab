import { useRouter } from "next/router";
import { useCallback } from "react";
import { MdGroups, MdGroup } from "react-icons/md";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Navbar from "../components/Navbar";
import IconCardButton from "../components/IconCardButton";
// import Footer from 'components/Footer'

const Homepage = () => {
  const router = useRouter();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const redirectToPage = useCallback((path) => router.push(path), [router]);

  return (
    <main className="min-h-screen justify-center bg-[#18181b] p-5">
      <Particles
        style={{ zIndex: -1, opacity: "0.5" }}
        id="tsparticles"
        init={particlesInit}
        url="https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/particles.json"
      />

      <Navbar />
      <div className="absolute w-[95vw]">
        <div className="flex min-h-[80vh] flex-col items-center justify-center sm:flex-row">
          <IconCardButton
            onClick={() => redirectToPage("/p2p")}
            text="Connect Peer 2 Peer"
            subtext="Fast & Secure"
            icon={<MdGroup style={{ display: "unset" }} fontSize={100} />}
          />
        </div>

        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default Homepage;
