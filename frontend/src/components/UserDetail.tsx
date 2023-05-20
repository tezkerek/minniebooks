import { css } from "@emotion/react";
import User from "@/entities/user";
import AuthGuard from "./AuthGuard";
import FriendshipActionButton from "./FriendshipActionButton";

interface UserDetailProps {
  user: User;
}

export default function UserDetail({ user }: UserDetailProps) {
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
            <FriendshipActionButton user={user} />
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
