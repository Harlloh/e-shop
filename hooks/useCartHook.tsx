import { cartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

//create the context and pass the value you want to be accessible to all component
type cartContextType = {
  paymentIntent: string | null;

  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: cartProductType[] | null;
  handleAddProductToCart: (product: cartProductType) => void;
  handleRemoveProductFromCart: (product: cartProductType) => void;
  handleCartQtyIncrease: (product: cartProductType) => void;
  handleCartQtyDecrease: (product: cartProductType) => void;
  handleClearCart: () => void;
  handleSetPaymentIntent: (value: string | null) => void;
};
export const cartContext = createContext<cartContextType | null>(null);

// create a provider for the context
interface PropsType {
  [propName: string]: any;
}

export const CartContextProvider = (props: PropsType) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<cartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("cartItems");
    const cProducts: cartProductType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");

    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (accumulator, item) => {
            const itemTotal = item.price * item.quantity;

            accumulator.total += itemTotal;

            accumulator.qty += item.quantity;

            return accumulator;
          },
          { total: 0, qty: 0 }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: cartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Items added to cart!");
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: cartProductType) => {
      if (cartProducts) {
        const filteredProduct = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProduct);
        toast.success("products removed from cart!");
        localStorage.setItem("cartItems", JSON.stringify(filteredProduct));
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: cartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Oops maximum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingProductIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (existingProductIndex > -1) {
          updatedCart[existingProductIndex].quantity += 1;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: cartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("Oops minimum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingProductIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (existingProductIndex > -1) {
          updatedCart[existingProductIndex].quantity -= 1;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.removeItem("cartItems");
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      localStorage.setItem("eShopPaymentIntent", JSON.stringify(value));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    paymentIntent,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleSetPaymentIntent,
  };
  return <cartContext.Provider value={value} {...props} />;
};

//this down part is not really neccessary it is just to send and check if the context value is empty or not and is used to access it too
export const useCart = () => {
  const context = useContext(cartContext);
  if (context === null) {
    throw new Error("useCart must be used withing a cartContext provider");
  }
  return context;
};
