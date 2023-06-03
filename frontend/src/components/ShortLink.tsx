import NextLink, { LinkProps } from "next/link";
import styles from "@/styles/mixins.module.scss";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

export default function ShortLink(props: Props) {
  return (
    <NextLink {...props} className={styles.slidingUnderline}>
      {props.children}
    </NextLink>
  );
}
