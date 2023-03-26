import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/Racer.module.css";
//TODO: delete everything
interface Quote {
  text: string;
}
let DBQuote: Quote = { text: "asd asd asd;" };

let quoteIndex = 0;

function MinnieComponent() {
  return (
    <div className={styles.center}>
      <h2>bravo</h2>
      <Image
        src="https://cdn.discordapp.com/attachments/893256151825805341/1088758616259047474/20230324_113551.jpg"
        width={400}
        height={300}
        alt="bebe"
      />
    </div>
  );
}
function checkLetter(
  typedWord: string,
  indexToCompare: number = quoteIndex
): boolean {
  return typedWord === DBQuote.text[indexToCompare];
}
function checkQuoteEnd(): boolean {
  return quoteIndex === DBQuote.text.length;
}
function handleKeyPress(
  event: any,
  callback: Function,
  typedString: string,
  setTypedString: Function
) {
  const keypress = event.key;
  const keyOpcode = keypress.length == 1 ? keypress.charCodeAt(0) : -1;

  if (keypress === "Backspace") {
    if (!event.ctrlKey) {
      setTypedString(typedString.slice(0, -1));
    } else {
      // handle ctrl + backspace
      // stop at first space
      let foundSpace = typedString.lastIndexOf(" ", typedString.length - 2);
      setTypedString(typedString.slice(0, foundSpace + 1));
    }
  }
  if (typedString.length === DBQuote.text.length) {
    //rejectInput
    return;
  }
  if (0x20 <= keyOpcode && keyOpcode <= 0x7e) {
    // printable
    if (keyOpcode == 0x20 && DBQuote.text[typedString.length] != " ") {
      // ignore bad spaces
      return;
    }
    setTypedString(typedString + keypress);
  }

  if (typedString.length < quoteIndex) {
    // handle delete good characters
    quoteIndex = typedString.length;
  }
  if (checkLetter(keypress) && typedString.length == quoteIndex) {
    quoteIndex++;
    if (checkQuoteEnd()) {
      callback();
    }
  }
}

function TypeRacerComponent(props: any) {
  const [typedString, setTypedString] = useState<string>("");

  const typedIterator = typedString[Symbol.iterator]();
  const quoteIterator = DBQuote.text[Symbol.iterator]();

  let currCharTyped = typedIterator.next();
  let currCharQuote = quoteIterator.next();
  let htmlArr = [];
  let uniqueVal = 0;
  while (!currCharQuote.done && !currCharTyped.done) {
    if (currCharTyped.value === currCharQuote.value) {
    }
    if (currCharQuote.value === currCharTyped.value) {
      htmlArr.push(
        <span key={uniqueVal} className={styles.goodWord}>
          {currCharQuote.value}
        </span>
      );
    } else
      htmlArr.push(
        <span key={uniqueVal} className={styles.badWord}>
          {currCharQuote.value}
        </span>
      );
    currCharTyped = typedIterator.next();
    currCharQuote = quoteIterator.next();
    uniqueVal++;
  }
  while (!currCharQuote.done) {
    htmlArr.push(
      <span key={uniqueVal} className={styles.neuralWord}>
        {currCharQuote.value}
      </span>
    );
    uniqueVal++;

    currCharQuote = quoteIterator.next();
  }
  return (
    <div className={styles.center}>
      {htmlArr}
      <div></div>
      <div></div>
      <input
        type="text"
        placeholder="scrie te rog"
        value={props.inputValue}
        onKeyDown={(e) =>
          handleKeyPress(e, props.onDone, typedString, setTypedString)
        }
      />
    </div>
  );
}

function Racer(props: any = DBQuote): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [doneQuote, setDoneQuote] = useState<boolean>(false);
  if (doneQuote) {
    return <MinnieComponent />;
  } else
    return (
      <TypeRacerComponent
        inputValue={props.text}
        onDone={() => {
          setDoneQuote(true);
        }}
      />
    );
}

export default Racer;
