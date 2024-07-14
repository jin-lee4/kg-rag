import Image from "next/image";
import Upload from "./components/Upload";
import Modes from "./components/Modes";
import Settings from "./components/Settings";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full items-center justify-between lg:flex space-x-10">
        <div className="flex-col space-y-96">
          <Modes />
          <Settings />
        </div>
        <Upload />
      </div>
    </main>
  );
}
