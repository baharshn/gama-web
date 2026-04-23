import Hero from "@/components/sections/Hero"
import Workhorse from "@/components/sections/Workhorse"
import Droneword from "@/components/sections/Droneword";
import PayloadSelector from "@/components/sections/PayloadSelector";
import PayloadWeight from "@/components/sections/PayloadWeight";
import Drone360 from "@/components/sections/Drone360";

export default function Home() {
  return (
    <>
      <Hero />
      <Workhorse />
      <Droneword/>

      <PayloadWeight/>
      <Drone360 />
    </>
  )
}