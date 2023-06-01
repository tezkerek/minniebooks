import { css } from "@emotion/react";
import { BriefAuthor } from "@/entities/author";

interface AuthorDetailProps {
  author: BriefAuthor;
}

export default function UserDetail({ author }: AuthorDetailProps) {
  return (
    <div>
      <div css={mainCss}>
        <img src={author.picture} alt="User picture" width={300} height={300} />
        <div css={detailsCss}>
          <p css={titleCss}>{`${author.fullName}`}</p>
          <div css={aboutCss}>
            <p>{author.description}</p>
          </div>
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
  padding-bottom: 25px;
  font-weight: bold;
`;

const aboutCss = css`
  font-size: 1.1.em;
  padding-bottom: 25px;
  padding-top: 25px;
`;
