import React from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import ManageOrdersClient from "./ManageOrderClient";
import getOrders from "@/actions/getOrders";

async function ManageOrders() {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops access denied" />;
  }
  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
}

export default ManageOrders;
