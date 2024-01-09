import React from "react";
import ManageProductClient from "./ManageProductClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

async function ManageProducts() {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops access denied" />;
  }
  return (
    <div>
      <ManageProductClient products={products} />
    </div>
  );
}

export default ManageProducts;
