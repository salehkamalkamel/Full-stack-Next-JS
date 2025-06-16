import Link from "next/link";
import { NavigationMenu } from "../navigation-menu";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

// Featured categories for the dropdown menu
const featuredCategories = [
  {
    name: "Action",
    href: "/games?category=action",
    description: "Fast-paced games with intense gameplay",
  },
  {
    name: "Adventure",
    href: "/games?category=adventure",
    description: "Story-driven exploration games",
  },
  {
    name: "RPG",
    href: "/games?category=rpg",
    description: "Role-playing games with character development",
  },
  {
    name: "Strategy",
    href: "/games?category=strategy",
    description: "Games that require tactical thinking",
  },
];

export default function DesktopNavigation() {
  return (
    <div className="flex items-center gap-6">
      <Link href="/" className="flex items-center">
        <span className="font-semibold text-xl">GameVault</span>
      </Link>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Games</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-1 gap-3 p-4">
                <div className="col-span-1">
                  <div className="font-medium mb-2 text-sm">Categories</div>
                  <ul className="grid gap-3">
                    {featuredCategories.map((category) => (
                      <li key={category.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {category.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/wishlist" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Wishlist
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
