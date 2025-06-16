import { ProductDetailes } from "@/lib/types/product-type";
import { isAddedToCart } from "@/actions/cart-action";
import { isAddedToWishlist } from "@/actions/wishlist-actions";
import GameInfoCard from "./game-info-card";
import PurchaseOptions from "./purchase-options";
import ProtectionPlan from "./protection-plan";

interface GameInfoSidebarProps {
  game: ProductDetailes;
}

export default async function GameInfoSidebar({ game }: GameInfoSidebarProps) {
  const addedToWishlist = await isAddedToWishlist(game.id);
  const addedToCart = await isAddedToCart(game.id);

  return (
    <div className="space-y-8">
      {/* Game Info Card */}
      <GameInfoCard game={game} />

      {/* Purchase Options */}
      <PurchaseOptions
        game={game}
        addedToWishlist={addedToWishlist}
        addedToCart={addedToCart}
      />

      {/* Protection Plan */}
      <ProtectionPlan />
    </div>
  );
}
