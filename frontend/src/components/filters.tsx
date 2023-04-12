import { Publisher } from "@/entities/book";

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
    <div>
      {publishers.map((publisher, i) => (
        <div key={i}>
          <label>
            <input type="checkbox" onChange={handleBox} value={publisher} />
            {publisher}
          </label>
        </div>
      ))}
    </div>
  );
}
