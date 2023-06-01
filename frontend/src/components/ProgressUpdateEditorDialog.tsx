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
    <Dialog {...dialogProps} fullWidth={true} maxWidth="sm">
      <DialogContent
        css={css`
          padding: 40px;
        `}
      >
        <ProgressUpdateEditor onDone={onDone} />
      </DialogContent>
    </Dialog>
  );
}
