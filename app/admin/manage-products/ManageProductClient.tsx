"use client";
import { Product } from "@prisma/client";
import React from "react";
interface ManageProductClientProps {
  products: Product[];
}

const ManageProductClient: React.FC<ManageProductClientProps> = ({
  products,
}) => {
  return <div></div>;
};

export default ManageProductClient;
