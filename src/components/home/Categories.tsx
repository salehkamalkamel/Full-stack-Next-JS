import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Action", icon: "/icons/action.png" },
  { name: "Adventure", icon: "/icons/adventure.png" },
  { name: "RPG", icon: "/icons/rpg.png" },
  { name: "Strategy", icon: "/icons/strategy.png" },
  { name: "Simulation", icon: "/icons/simulation.png" },
  { name: "Sports", icon: "/icons/sports.png" },
];
export default function Categories() {
  return (
    <section className="py-12 md:py-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Browse by Category
        </h2>
        <Link
          href="/games"
          className="text-primary flex items-center hover:underline"
        >
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/games?category=${category.name.toLowerCase()}`}
            className="group relative overflow-hidden rounded-lg border bg-background hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center justify-center p-6">
              <div className="relative h-16 w-16 mb-4">
                <Image
                  loading="lazy"
                  src={category.icon || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-center font-medium">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
