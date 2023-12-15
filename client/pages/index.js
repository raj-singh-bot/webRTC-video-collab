import { useRouter } from "next/router";
import { useCallback } from "react";
import { MdGroups, MdGroup } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Navbar from "../components/Navbar";
import IconCardButton from "../components/IconCardbutton";
// import Footer from 'components/Footer'

const Homepage = () => {
  const router = useRouter();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const redirectToPage = useCallback((path) => router.push(path), [router]);

  return (
    <main className="min-h-screen justify-center bg-[#fff]">
      {/* <Particles
        style={{ zIndex: -1, opacity: "0.5" }}
        id="tsparticles"
        init={particlesInit}
        url="https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/particles.json"
      /> */}

      <Navbar />
      <div className="absolute w-[100vw] p-10">
        <div className="flex min-h-[80vh] flex-col items-center justify-between sm:flex-row">
          <div className="w-1/2">
            <div style={{ width: "90%" }}>
              <h2
                style={{
                  fontSize: "42px",
                  fontFamily: "Work Sans, sans-serif",
                  lineHeight: "46px",
                  marginBottom: "15px",
                }}
              >
                Video calls and meetings for everyone.
              </h2>
              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#6a6e74",
                }}
              >
                Google Meet is one service for secure, high-quality video
                meetings and calls available for everyone, on any device.
              </p>
              <IconCardButton
                onClick={() => redirectToPage("/p2p")}
                text="Start a meeting"
                // subtext="Start a meeting"
                icon={<BiVideo style={{ display: "unset" }} fontSize={30} />}
              />
            </div>
          </div>
          <div className="w-1/2">
            <img src="/hero.png" />
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default Homepage;
