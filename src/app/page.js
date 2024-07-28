import Image from "next/image";
import Upload from "./components/Upload";
import Modes from "./components/Modes";
import Settings from "./components/Settings";
import Suggestions from "./components/Suggestions";

export default function Home() {

  return (
    <main className="flex flex-col items-center pb-6 h-full min-h-screen pr-4">
      <div className="flex space-x-5 mx-12 h-full">
        <div id="left-panel" className="flex flex-col justify-between space-y-6 w-1/4 min-h-full">
          <div>
            <Modes />
          </div>
          <div>
            <Settings/>
          </div>
        </div>
        <div id="center-panel" className="flex-grow flex flex-col min-h-full">
          <Upload />
        </div>
        <div id="right-panel" className="flex-grow flex flex-col min-h-full">
          <Suggestions />
        </div>
      </div>
    </main>
  );
}
