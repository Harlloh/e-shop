import React from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
// import ManageOrdersClient from "./ManageOrderClient";
import getOrders from "@/actions/getOrders";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import ManageOrdersClient from "../admin/manage-orders/ManageOrderClient";
import OrdersClient from "./OrdeClient";

async function Order() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NullData title="Oops access denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);
  if (!orders) {
    return <NullData title="You have not placed any order yet!" />;
  }
  return (
    <div>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
}

export default Order;
