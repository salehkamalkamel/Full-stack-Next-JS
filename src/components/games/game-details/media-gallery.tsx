"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageType } from "@/lib/types/product-type";

interface ImageGalleryProps {
  images: ImageType[];
}

export default function MediaGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const imageCount = images.length;

  // Handle slideshow functionality
  useEffect(() => {
    if (!isSlideshowActive) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % imageCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [isSlideshowActive, imageCount]);

  const navigateImages = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev") {
        setSelectedIndex((prev) => (prev - 1 + imageCount) % imageCount);
      } else {
        setSelectedIndex((prev) => (prev + 1) % imageCount);
      }
    },
    [imageCount]
  );
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "Escape") {
          setIsFullscreen(false);
          setIsZoomed(false);
        }
        if (e.key === "ArrowLeft") {
          navigateImages("prev");
        }
        if (e.key === "ArrowRight") {
          navigateImages("next");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, navigateImages]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const toggleSlideshow = () => {
    setIsSlideshowActive(!isSlideshowActive);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      setIsZoomed(false);
    } else {
      setIsFullscreen(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image Viewer */}
      <div className="relative">
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border transition-all duration-300",
            isFullscreen
              ? "fixed inset-0 z-50 bg-black/90 border-0 rounded-none"
              : "aspect-video"
          )}
        >
          <div
            className={cn(
              "relative w-full h-full transition-transform duration-300",
              isZoomed && "cursor-zoom-out scale-150"
            )}
            onClick={toggleZoom}
          >
            <Image
              src={images[selectedIndex].url || "/placeholder.svg"}
              alt={`Game screenshot ${selectedIndex + 1}`}
              fill
              className={cn("object-contain", isFullscreen ? "p-4" : "")}
              priority={selectedIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Navigation Controls */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-center justify-between p-4",
              isFullscreen ? "p-6" : ""
            )}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => navigateImages("prev")}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => navigateImages("next")}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={toggleSlideshow}
              >
                {isSlideshowActive ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {isSlideshowActive ? "Pause slideshow" : "Start slideshow"}
                </span>
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={toggleZoom}
              >
                {isZoomed ? (
                  <ZoomOut className="h-5 w-5" />
                ) : (
                  <ZoomIn className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {isZoomed ? "Zoom out" : "Zoom in"}
                </span>
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <div className="h-4 w-4 border-2 border-current" />
                )}
                <span className="sr-only">
                  {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                </span>
              </Button>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-md">
            {selectedIndex + 1} / {imageCount}
          </div>
        </div>
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative aspect-video overflow-hidden rounded-md border transition-all",
              selectedIndex === index
                ? "ring-2 ring-primary border-primary"
                : "opacity-70 hover:opacity-100"
            )}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 10vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
