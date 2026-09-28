import Hero from "./_component/Hero";
import Header2 from "./_component/Header2";

import Menu from "./_component/Menu";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen bg-[#404040] ">
      <Header2 />
      <Hero />
      <Menu />
    </div>
  );
}
