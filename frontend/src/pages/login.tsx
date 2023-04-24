import Head from "next/head";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "@/styles/Login.module.scss";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const emailValidation: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailGood: boolean = emailValidation.test(email);
  const passwordGood: boolean = password != "";

  return (
    <>
      <Head>
        <title>Login | MinnieBooks</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.login}>
        <p css={titleCss}>Login</p>
        <TextField
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setEmail(event.target.value);
          }}
          label="Email"
          required={true}
          margin="normal"
          error={!emailGood && email != ""}
          autoFocus={true}
        />
        <TextField
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setPassword(event.target.value);
          }}
          label="Password"
          required={true}
          margin="normal"
          type="password"
        />
        <Button
          disabled={!(emailGood && passwordGood)}
          onClick={(): void => {
            console.log(email, password);
          }}
        >
          Login
        </Button>
        <p>
          or{" "}
          <a
            css={css`
              text-decoration: underline;
            `}
            href="register"
          >
            register
          </a>
        </p>
      </main>
    </>
  );
}
const titleCss = css`
  font-size: 2em;
  padding-bottom: 25px;
  font-weight: bold;
`;
