import React from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
import { products } from "../../utils/Product";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
interface IParams {
  productId?: string;
}

async function Product({ params }: { params: IParams }) {
  const product = await getProductById(params);
  if (!product) {
    return <NullData title="Oops! Product not found" />;
  }

  const currentUser = await getCurrentUser();
  debugger;
  return (
    <Container>
      <div>
        <ProductDetails products={product} />
        <div className="flex flex-col gap-4 mt-20">
          <div>
            <AddRating product={product} user={currentUser} />
            <ListRating product={product} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
