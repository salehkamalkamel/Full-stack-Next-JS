"use client";

import React, { useState, useMemo } from "react"; // Import useState and useMemo
import Link from "next/link";
import Image from "next/image";
import { Star, Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  FilterSectionProps,
  GamesClientViewProps,
} from "@/lib/types/games-type";

function FilterSection({
  title,
  items,
  selectedItems,
  onToggleItem,
  idPrefix,
}: FilterSectionProps) {
  return (
    <div className="px-4">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${idPrefix}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={() => onToggleItem(item)}
            />
            <Label
              htmlFor={`${idPrefix}-${item}`}
              className="text-sm font-normal cursor-pointer"
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Client Component ---
export default function GamesClientView({
  initialGames,
  allCategories,
  allPlatforms,
}: GamesClientViewProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]); // Assuming max price is 100
  const [sortOption, setSortOption] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toggle platform selection
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPlatforms([]);
    setPriceRange([0, 100]); // Reset price range
    // setSortOption("featured"); // Optionally reset sort
  };

  // Filter and Sort Games using useMemo for optimization
  const processedGames = useMemo(() => {
    const filtered = initialGames.filter((game) => {
      // Filter by category
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(game.category)
      ) {
        return false;
      }
      // Filter by platform
      if (
        selectedPlatforms.length > 0 &&
        !game.platform.some((p) => selectedPlatforms.includes(p))
      ) {
        return false;
      }
      // Filter by price
      if (game.price < priceRange[0] || game.price > priceRange[1]) {
        return false;
      }
      return true;
    });

    // Sort games
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating; // Ensure rating is a number
        case "newest":
          return (
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
          );
        default:
          return 0; // Featured (initial order)
      }
    });
  }, [
    initialGames,
    selectedCategories,
    selectedPlatforms,
    priceRange,
    sortOption,
  ]);

  const renderFilters = (idPrefix: string) => (
    <div className="space-y-6">
      <FilterSection
        title="Category"
        items={allCategories}
        selectedItems={selectedCategories}
        onToggleItem={toggleCategory}
        idPrefix={`${idPrefix}-category`}
      />
      <FilterSection
        title="Platform"
        items={allPlatforms}
        selectedItems={selectedPlatforms}
        onToggleItem={togglePlatform}
        idPrefix={`${idPrefix}-platform`}
      />

      {/* Price Range Filter */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Price Range</h3>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[0, 100]} // Set default based on your data range
          max={100} // Adjust max based on your actual max price
          step={5}
          value={priceRange}
          onValueChange={setPriceRange} // This expects number[]
          className="my-4"
        />
      </div>
    </div>
  );

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPlatforms.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100; // Adjust max price check

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-8 ">
      {/* --- Desktop Sidebar Filters --- */}
      <div className="hidden md:block w-64 sticky top-20 px-4 ">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear
              </Button>
            )}
          </div>
          {renderFilters("desktop")}
        </div>
      </div>

      {/* --- Mobile Filter Button & Sheet --- */}
      <div className="md:hidden w-full ">
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Games</h1>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[350px] overflow-y-auto"
          >
            {/* Added overflow */}
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">{renderFilters("mobile")}</div>
            {/* Buttons inside SheetContent */}
            <div className="flex gap-2 pt-4 border-t mt-4 sticky bottom-0 bg-background pb-4 px-6">
              {/* Sticky footer for buttons */}
              <Button
                className="flex-1"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  clearFilters();
                  setIsMobileFilterOpen(false);
                }}
              >
                Clear All
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* --- Games Grid Section --- */}
      <div className="flex-1">
        {/* Sort and Results Count - Desktop */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {processedGames.length}
            </span>{" "}
            games
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sort - Mobile */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {processedGames.length} games
          </p>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                {category}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
                  onClick={() => toggleCategory(category)}
                >
                  <X className="h-3 w-3" />{" "}
                  <span className="sr-only">Remove {category} filter</span>
                </Button>
              </Badge>
            ))}
            {selectedPlatforms.map((platform) => (
              <Badge
                key={platform}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                {platform}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
                  onClick={() => togglePlatform(platform)}
                >
                  <X className="h-3 w-3" />{" "}
                  <span className="sr-only">Remove {platform} filter</span>
                </Button>
              </Badge>
            ))}
            {/* Optionally show price range filter badge */}
            {/* {(priceRange[0] > 0 || priceRange[1] < 100) && (...)} */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs ml-auto"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Games Grid */}
        {processedGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedGames.map((game) => (
              <Card key={game.id} className="overflow-hidden flex flex-col">
                {" "}
                {/* Added flex flex-col */}
                <Link
                  href={`/games/${game.id}`}
                  className="block relative aspect-[3/2] overflow-hidden"
                >
                  <Image
                    src={game.image || "/placeholder.svg"} // Use processed image URL
                    alt={game.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Optimize image loading
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <CardContent className="p-4 flex-grow">
                  {" "}
                  {/* Added flex-grow */}
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{game.category}</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      {/* Use actual rating */}
                      <span className="text-sm">{game.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {" "}
                    {/* Line clamp title */}
                    <Link
                      href={`/games/${game.id}`}
                      className="hover:underline"
                    >
                      {game.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {game.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-auto">
                  {" "}
                  {/* Added border-t mt-auto */}
                  <span className="font-semibold">
                    ${game.price.toFixed(2)}
                  </span>
                  <Button size="sm" asChild>
                    <Link href={`/games/${game.id}`}>View Game</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // No Results View
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg mt-6">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              No games match your filters
            </h3>
            <p className="text-muted-foreground mb-4 max-w-xs">
              {
                " Try adjusting or clearing your filters to find what you're looking for."
              }
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
