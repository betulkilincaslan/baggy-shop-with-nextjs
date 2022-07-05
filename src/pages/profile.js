import React, { useContext } from "react";
import { Container, Typography } from "@mui/material";
import Layout from "components/Layout";
import { Store } from "context/Store";
import dynamic from "next/dynamic";

function Profile() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <Layout title="Profile">
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h1" color="initial">
          {userInfo && `${userInfo.name}'s Profile`}
        </Typography>
      </Container>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
