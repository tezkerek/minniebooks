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
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const emailGood: boolean = emailValidation.test(email);
  const passwordGood: boolean = confirmPassword === password && password != "";
  return (
    <>
      <Head>
        <title>Register | MinnieBooks</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.login}>
        <p css={titleCss}>Register</p>
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
        <TextField
          value={confirmPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setConfirmPassword(event.target.value);
          }}
          label="Confirm password"
          required={true}
          margin="normal"
          type="password"
          error={!passwordGood && password != ""}
        />
        <Button
          disabled={!(passwordGood && emailGood)}
          onClick={(): void => {
            console.log(email, password);
          }}
        >
          Register
        </Button>
        <p>
          or{" "}
          <a
            css={css`
              text-decoration: underline;
            `}
            href="login"
          >
            login
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
