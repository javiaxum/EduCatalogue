import React, { useEffect, useState } from 'react';

interface Props {
    width: string;
    height: string;
    min: number;
    max: number;
    step?: string;
}

export default function RangeSlider({ width, height, min, max }: Props) {

    const [mousePosition, setMousePosition] = useState({ x: null, y: null });

    useEffect(() => {
        const updateMousePosition = (ev: any) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <div style={{ width: width, height: height, backgroundColor: '#6bf' }}>
            <div style={{ borderRadius: '1000rem', width: '1rem', height: '1rem',  backgroundColor: '#6bf'}}>

            </div>
            {JSON.stringify(mousePosition)}
        </div>
    )
}