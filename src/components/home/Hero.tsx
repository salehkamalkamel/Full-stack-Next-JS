import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[100vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src="/home/metroid-prime-4.jpg"
          alt="Featured Game"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center sm:justify-end p-6 sm:p-10 md:p-16 container">
          <div className="max-w-xl space-y-4">
            <Badge className="mb-2">New Release</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Metroid Prime 4
            </h1>
            <p className="text-lg hidden sm:block text-muted-foreground md:text-xl">
              Experience the thrill of exploration and combat in this
              long-awaited sequel to the iconic Metroid series. Join Samus Aran
              as she uncovers new mysteries and battles formidable foes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/games">Explore Games</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/games">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
