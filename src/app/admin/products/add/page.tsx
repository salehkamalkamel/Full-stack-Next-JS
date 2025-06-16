"use client";

import Heading from "@/components/admin/addProduct/Heading";
import { AddProductProvider } from "@/contexts/AddProductContext";
import ProductForm from "@/components/admin/addProduct/ProductForm";

export default function AddProductPage() {
  return (
    <div className="container mx-auto ">
      <AddProductProvider>
        <Heading />
        <ProductForm />
      </AddProductProvider>
    </div>
  );
}
