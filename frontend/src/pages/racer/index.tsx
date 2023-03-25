import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Racer.module.css";
//TODO: delete everything
interface Quote {
  text: string;
}
let DBQuote: Quote = { text: "a" };

let quoteIndex = 0;
let typedString = "";

 function MinnieComponent() {
  return (
    <div className={styles.center}>
      <h2>bravo</h2>
      <Image
        src="https://cdn.discordapp.com/attachments/893256151825805341/1088758616259047474/20230324_113551.jpg"
        width= {300}
        height={300}
        alt="bebe"
      />
    </div>
  );
}
export function displayQuote(input: string) {
  return (
    <div>
      <h2>{input}</h2>
      <h3>
        Sunt la litera {quoteIndex}, adica la {DBQuote.text[quoteIndex]}{" "}
      </h3>
    </div>
  );
}
function checkLetter(typedWord: string): boolean {
  return typedWord === DBQuote.text[quoteIndex];
}
function checkQuoteEnd(): boolean {
  return quoteIndex === DBQuote.text.length;
}

function handleKeyPress(event: any,callback:Function) {
  const keypress = event.key;
  const keyOpcode = keypress.length == 1 ? keypress.charCodeAt(0) : -1;

  if (0x20 <= keyOpcode && keyOpcode <= 0x7e) {
    // printable
    typedString += keypress;
  } else if (keypress === "Backspace") {
    typedString = typedString.slice(0, -1);
    if (typedString.length < quoteIndex) { // handle delete good characters
      quoteIndex -= 1;
    console.log(quoteIndex);

    }
  }
  if (checkLetter(keypress)) {
    quoteIndex++;
    console.log(quoteIndex);
    if (checkQuoteEnd()) {
      callback();
    }
  }
}

function TypeRacerComponent(props: any) {
  const typedIterator = typedString[Symbol.iterator]();
  const quoteIterator = DBQuote.text[Symbol.iterator]();

  let currCharTyped = typedIterator.next();
  let currCharQuote = quoteIterator.next();

  while (!currCharQuote.done && !currCharTyped.done) {
    if (currCharTyped.value === currCharQuote.value) {
    }
    currCharTyped = typedIterator.next().value;
    currCharQuote = quoteIterator.next().value;
  }
  return (
    <div className={styles.center}>
      {<div>{displayQuote(DBQuote.text)}</div>}

      <div></div>
      <div></div>
      <input
        type="text"
        placeholder="scrie te rog"
        value={props.inputValue}
        onKeyDown={(e) => handleKeyPress(e, props.onDone)}
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
  return <TypeRacerComponent inputValue={props.text} onDone= {()=>{setDoneQuote(true)}}/>;
}

export default Racer;
