import { css } from "@emotion/react";
import User from "@/entities/user";
import Button from "./Button";
import { useCurrentUser } from "@/api/user";
import AuthGuard from "./AuthGuard";

interface UserDetailProps {
  user: User;
}

export default function UserDetail({ user }: UserDetailProps) {
  let { user: currentUser, error, isLoading } = useCurrentUser();
  isLoading = isLoading || typeof currentUser === "undefined";

  const isFriend = currentUser ? user.id in currentUser.friends : false;

  return (
    <div css={mainCss}>
      <img
        src={user.profilePicture}
        alt="User picture"
        width={300}
        height={300}
      />

      <div css={detailsCss}>
        <p css={titleCss}>{`${user.fullName}`}</p>

        <div
          css={css`
            margin-top: 10px;
          `}
        >
          <AuthGuard>
            {isFriend ? (
              <Button onClick={console.log}>Remove friend</Button>
            ) : (
              <Button onClick={console.log}>Add friend</Button>
            )}
          </AuthGuard>
        </div>
      </div>
    </div>
  );
}

const mainCss = css`
  width: 100%;
  display: flex;
  padding: 25px 0;
`;

const detailsCss = css`
  display: inline-flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 25px 20px;
`;

const titleCss = css`
  font-size: 2em;
  font-weight: bold;
`;
