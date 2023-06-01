import { css } from "@emotion/react";
import { Publisher } from "@/entities/book";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface PublisherFilterProps {
  publishers: Array<Publisher>;
  selectedPublishers: Array<Publisher>;
  onChange: (publishers: Array<Publisher>) => void;
}

export default function PublisherFilter({
  publishers,
  selectedPublishers,
  onChange,
}: PublisherFilterProps) {
  const handleBox = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      selectedPublishers = selectedPublishers.filter(
        (arrElem) => event.currentTarget.value != arrElem
      );
      selectedPublishers.push(event.currentTarget.value);
    } else {
      selectedPublishers = selectedPublishers.filter(
        (arrElem) => event.currentTarget.value != arrElem
      );
    }
    onChange(selectedPublishers);
  };

  return (
    <>
      <FormGroup>
        {publishers.map((publisher, i) => (
          <FormControlLabel
            key={i}
            label={publisher}
            control={
              <Checkbox
                css={checkboxColor}
                checked={selectedPublishers.includes(publisher)}
                onChange={handleBox}
                value={publisher}
              />
            }
          />
        ))}
      </FormGroup>
    </>
  );
}
const checkboxColor = css`
  accent-color: var(--color-accent);
`;
const labelCheckbox = css`
  accent-color: var(--color-accent);
`;
