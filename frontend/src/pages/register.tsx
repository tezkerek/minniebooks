import Head from "next/head";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/api/auth";

const emailValidation: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function RegisterPage(): JSX.Element {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const emailGood: boolean = emailValidation.test(email);
  const passwordGood: boolean = confirmPassword === password && password != "";

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Register | MinnieBooks</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <p css={titleCss}>Register</p>
        <TextField
          value={firstName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setFirstName(event.target.value);
          }}
          label="First Name"
          required={true}
          margin="normal"
          autoFocus={true}
        />
        <TextField
          value={lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setLastName(event.target.value);
          }}
          label="Last Name"
          required={true}
          margin="normal"
          autoFocus={true}
        />
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
          disabled={!(passwordGood && emailGood && firstName.length > 0 && lastName.length > 0)}
          onClick={(): void => {
            register(firstName, lastName, email, password)
              .then(() => router.push("/login"))
              .catch((err) => alert(JSON.stringify(err)));
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
