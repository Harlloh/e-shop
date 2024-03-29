import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import React from "react";
import AddProductForm from "./addProductForm";
import NullData from "@/app/components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";

async function AddProducts() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops access denied" />;
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
}

export default AddProducts;
