import React from 'react';
import { Icon } from 'semantic-ui-react';

interface Props {
    rating: number;
}

export default function RatingStars({ rating }: Props) {

    let elements = [];
    for (let i = 1; i <= 5; i++) {
        i <= Math.round(rating) ?
            elements.push((<Icon color='yellow' name='star' key={i} />)) :
            elements.push((<Icon color='yellow' name='star outline' key={i} />))
    }

    return (<div style={{minWidth: '10rem', maxWidth: '10rem'}}>{elements}</div>)
}