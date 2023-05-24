import { css } from "@emotion/react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProgressUpdateEditor, { ProgressUpdate } from "./ProgressUpdateEditor";

interface ProgressUpdateEditorDialogProps extends DialogProps {
  onDone?: (progressUpdate: ProgressUpdate) => void;
}

export default function ProgressUpdateEditorDialog(
  props: ProgressUpdateEditorDialogProps
) {
  const { onDone, ...dialogProps } = props;

  return (
    <Dialog {...dialogProps}>
      <DialogContent
        css={css`
          padding: 3vw;
        `}
      >
        <ProgressUpdateEditor onDone={onDone} />
      </DialogContent>
    </Dialog>
  );
}
