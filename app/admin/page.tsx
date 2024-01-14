import React from "react";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";
import NullData from "../components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";

async function page() {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops access denied" />;
  }

  const graphData = await getGraphData();

  const usersArray = users || [];

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={usersArray} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
}

export default page;
