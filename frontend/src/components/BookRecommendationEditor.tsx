import { useState } from "react";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import User from "@/entities/user";

export interface BookRecommendation {
  friend: User;
  message: string;
}

interface BookRecommendationEditorProps {
  friends: Array<User>;
  onDone?: (recommendation: BookRecommendation) => void;
}

export default function BookRecommendationEditor({
  friends,
  onDone,
}: BookRecommendationEditorProps): JSX.Element {
  const [chosenFriend, setChosenFriend] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("I bet you'll love this <3");

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        `}
      >
        <Autocomplete
          css={css`
            margin-bottom: 10px;
            width: 100%;
          `}
          disablePortal
          autoSelect={true}
          options={friends as Array<User>}
          getOptionLabel={(friend) => {
            return friend.fullName;
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, newValue: User | null) => {
            setChosenFriend(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Recommend to" />
          )}
        />
        <TextareaAutosize
          minRows={6}
          css={css`
            display: block;
            margin: 10px;
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
          `}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
          }}
        />
        <Button
          css={css`
            margin: 8px;
          `}
          color="warning"
          variant="outlined"
          disabled={chosenFriend == null}
          onClick={() => {
            if (chosenFriend == null) return;
            onDone?.({
              friend: chosenFriend,
              message: message,
            });
          }}
        >
          Send recommendation
        </Button>
      </div>
    </>
  );
}
