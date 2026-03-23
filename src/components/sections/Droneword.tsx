import Image from "next/image"

export default function Droneword(){
    return(
        <section className="relative w-full h-screen bg-black overflow-hidden">
          <Image
              src="/images/droneword.png"
              alt="Droneword"
              fill
              className="object-cover opacity-80"
          />

          <div className="absolute bottom-24 left-0 right-0 text-center px-6 sm:px-20 z-10 animate-reveal animate-delay-1">
            <p className="text-white text-4xl sm:text-6xl font-black italic">
                “Finally a drone
                <br />
                without compromise“
            </p>

            <p className="text-white text-2xl mt-6 max-w-2xl mx-auto leading-relaxed italic">
                Patrick Weir
            </p>
          </div>
        </section>
    )
}