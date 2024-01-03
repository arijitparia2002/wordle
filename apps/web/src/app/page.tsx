import Image from "next/image";
import Header from "@/components/Header";
import Wordle from "@/components/Wordle";

export default function Home() {
  return (
    <div className="h-screen flex-col flex ">
      <Header />
      <Wordle/>
    </div>
  );
}
