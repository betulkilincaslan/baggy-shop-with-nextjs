import React, { useContext, useEffect } from "react";
import {
  Button,
  Container,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import Layout from "components/Layout";
import { Store } from "context/Store";
import { getError } from "/utils/error";
import { grey } from "@mui/material/colors";

export default function LoginPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo, router]);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      dispatch({ type: "LOGIN_USER", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      console.log(JSON.parse(Cookies.get("userInfo")));
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <Layout title="Login">
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h1" color="primary.dark">
            Login
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    inputProps={{ type: "email" }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "Email is not valid"
                          : "Email is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    inputProps={{ type: "password" }}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password
                        ? errors.password.type === "minLength"
                          ? "Password length is more than 5"
                          : "Password is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                <Typography color={grey[100]} sx={{ fontWeight: "bold" }}>
                  Login
                </Typography>
              </Button>
            </ListItem>
            <ListItem>
              Don&apos;t have an account? &nbsp;
              <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
                <Link>Register</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Container>
    </Layout>
  );
}
