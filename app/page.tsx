import { PropertyList } from "@/components";
import { Rubik_Burned } from "next/font/google";

const rubikBurned = Rubik_Burned({
  subsets: ["latin"],
  weight: '400'
});

export default function Home() {
  return (
    <main className={`flex flex-col items-center justify-between gap-y-16`}>
        <h2 className={`text-2xl font-bold tracking-tight text-gray-200 sm:text-4xl ${rubikBurned.className}`}>My Properties</h2>
        <PropertyList />
    </main>
  );
}
