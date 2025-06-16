import { Suspense } from "react";
import { SiteHeader } from "../site-header";
import Categories from "./Categories";
import Hero from "./Hero";

import { SiteFooter } from "../site-footer";
import { FeaturedGamesSkeleton } from "../games/featured-games-skeleton";
import { NewReleasesSkeleton } from "../games/new-releases-skeleton";
import dynamic from "next/dynamic";

const Featured = dynamic(() => import("./Featured"));

const NewRelease = dynamic(() => import("./NewRelease"));

const Newsletter = dynamic(() => import("./Newsletter"));

export default function HomePageLayout() {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-col min-h-screen">
        <Hero />
        <Categories />
        <Suspense fallback={<FeaturedGamesSkeleton />}>
          <Featured />
        </Suspense>
        <Suspense fallback={<NewReleasesSkeleton />}>
          <NewRelease />
        </Suspense>
        <Newsletter />
      </div>
      <SiteFooter />
    </>
  );
}
