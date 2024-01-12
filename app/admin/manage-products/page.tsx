import React from "react";
import ManageProductClient from "./ManageProductClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";

async function ManageProducts() {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops access denied" />;
  }
  console.log(products, ">>>>>>>>>>>>>>>");
  debugger;
  return (
    <div>
      <Container>
        <ManageProductClient products={products} />
      </Container>
    </div>
  );
}

export default ManageProducts;
