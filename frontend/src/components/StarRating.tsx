import styled from "@emotion/styled"

const Stars = styled.span`
    font-size: 1.5em;
    color: var(--rating-star-rgb);
`

export default function StarRating({ rating, outOf = 5 }: StarRatingProps) {
    const stars = "★".repeat(rating).padEnd(outOf, "☆");
    return <Stars>{stars}</Stars>
}

interface StarRatingProps {
    rating: number
    outOf?: number
}