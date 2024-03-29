"use client";
import { useCart } from "@/hooks/useCartHook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CheckoutClient() {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const router = useRouter();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  console.log('Payment INtent', paymentIntent)
  console.log('clinet secret', clientSecret)

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log(error, "Error");
          toast.error("SOmething went wrong");
        });
    }
  }, [cartProducts, paymentIntent]);

  return <div>Checkout</div>;
}

export default CheckoutClient;
