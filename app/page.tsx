import { PropertyList } from "@/components";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-y-7">
        <h2>My Properties</h2>
        <PropertyList />
    </main>
  );
}
