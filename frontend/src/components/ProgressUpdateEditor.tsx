import { useState } from "react";
import { css } from "@emotion/react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button, MenuItem, Select } from "@mui/material";
import { ProgressUpdateStatus as Status } from "@/entities/ProgressUpdate";

export interface ProgressUpdate {
  status: Status;
  message: string;
}

interface ProgressUpdateEditorProps {
  onDone?: (progressUpdate: ProgressUpdate) => void;
}

export default function ProgressUpdateEditor({
  onDone,
}: ProgressUpdateEditorProps) {
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>(Status.STARTED);

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 5px;
        `}
      >
        <p>Add a progress update</p>

        <Select
          value={status}
          onChange={(ev) => setStatus(ev.target.value)}
          css={css`
            width: 100%;
          `}
        >
          <MenuItem value={Status.STARTED}>Started reading</MenuItem>
          <MenuItem value={Status.READING}>Currently reading</MenuItem>
          <MenuItem value={Status.FINISHED}>Finished reading</MenuItem>
        </Select>

        <TextareaAutosize
          placeholder="Message"
          minRows={10}
          css={css`
            display: block;
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
          `}
          value={message}
          onChange={(ev) => {
            setMessage(ev.target.value);
          }}
        />

        <Button
          css={css`
            margin: 8px;
          `}
          color="warning"
          variant="outlined"
          onClick={() => onDone?.({ status: status as Status, message })}
        >
          Post update
        </Button>
      </div>
    </>
  );
}
