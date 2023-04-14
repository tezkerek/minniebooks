import styled from "@emotion/styled";

const Button = styled.button`
    font-size: 1.1em;
    background-color: transparent;
    color: var(--color-accent);
    padding: 10px 15px;
    border-radius: 3px;
    border: 2px solid var(--color-accent);
    cursor: pointer;
    box-sizing: border-box;
    transition: color 200ms, background-color 200ms;

    &:hover {
        background-color: var(--color-accent);
        color: var(--color-on-accent);
    } 
`

export default Button;