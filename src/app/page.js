import Image from "next/image";
import Upload from "./components/Upload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <h1>PDF OCR with Google Cloud Vision</h1>
      <Upload />
      </div>
    </main>
  );
}
