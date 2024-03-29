"use client";
import { useCart } from "@/hooks/useCartHook";
import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Heading from "../components/Heading";
import { cartProductType } from "../product/[productId]/ProductDetails";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "../utils/formatPrice";

function CartClient() {
  const { cartProducts, handleClearCart, cartTotalQty, cartTotalAmount } =
    useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center ">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <FaArrowLeft />
            <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className="justify-self-center"> Price</div>
        <div className="justify-self-center"> Quantity</div>
        <div className="justify-self-end"> Total</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((product: cartProductType) => {
            return <ItemContent key={product.id} item={product} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            lable="Clear cart"
            outline
            small
            handleClick={() => handleClearCart()}
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>SubTotal:</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and Shipping calcaulated at checkout
          </p>
          <Button lable="Checkout" handleClick={() => {}} />
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <FaArrowLeft />
            <span>Continue shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartClient;
