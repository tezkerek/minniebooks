import { css } from "@emotion/react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import User from "@/entities/user";
import { useFriendList } from "@/api/friend";
import BookRecommendationEditor, {
  BookRecommendation,
} from "./BookRecommendationEditor";

interface BookRecommendationDialogEditorProps extends DialogProps {
  onDone?: (recommendation: BookRecommendation) => void;
}

export default function BookRecommendationEditorDialog(
  props: BookRecommendationDialogEditorProps
) {
  let { friends, error, isLoading } = useFriendList();
  isLoading = isLoading || typeof friends === "undefined";

  const { onDone, ...dialogProps } = props;

  return (
    <Dialog {...dialogProps} fullWidth maxWidth="sm">
      <DialogContent
        css={css`
          padding: 30px;
        `}
      >
        <p
          css={css`
            text-align: center;
            margin-bottom: 5px;
          `}
        >
          Recommend this book
        </p>
        <BookRecommendationEditor
          friends={isLoading ? [] : (friends as Array<User>)}
          onDone={(recommendation: BookRecommendation): void => {
            onDone?.(recommendation);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
