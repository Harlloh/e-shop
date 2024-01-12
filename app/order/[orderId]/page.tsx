import React from "react";
import OrderDetails from "./OrderDetails";
import Container from "@/app/components/Container";
import getOrderById from "@/actions/getOrdersById";
import NullData from "@/app/components/NullData";
interface IParams {
  orderId?: string;
}

async function Order({ params }: { params: IParams }) {
  const order = await getOrderById(params);
  if (!order) {
    return <NullData title="No Order"></NullData>;
  }
  return (
    <Container>
      <div>
        <OrderDetails order={order} />
      </div>
    </Container>
  );
}

export default Order;
