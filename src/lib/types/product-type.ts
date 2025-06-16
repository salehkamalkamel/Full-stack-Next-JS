import type {
  Image,
  Platform,
  Tag,
  Feature,
  SystemRequirement,
  Prisma,
} from "@prisma/client";

export type ImageType = Image;

export type PlatformType = Platform;

export type TagType = Tag;

export type FeatureType = Feature;

export type SystemRequirementType = SystemRequirement;

export type ProductDetailes = Prisma.ProductGetPayload<{
  include: {
    images: true;
    features: true;
    platforms: true;
    tags: true;
    systemRequirements: true;
  };
}>;

export type ProductWithImages = Prisma.ProductGetPayload<{
  include: {
    images: true;
  };
}>;
