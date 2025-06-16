import HomePageLayout from "@/components/home/home-page-layout";

// app/page.tsx
export const metadata = {
  title: "Buy & Download PC Games Online | GameStore",
  description: "Discover new releases, featured games, and more at GameStore.",
  openGraph: {
    title: "GameStore",
    description: "Find the latest games at the best prices.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return <HomePageLayout />;
}
