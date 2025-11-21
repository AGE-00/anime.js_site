import { useEffect, useState } from 'react';
import { animate } from 'animejs';

export default function ThemeToggle({ isDark, toggleTheme }) {
    const handleClick = () => {
        toggleTheme();
        // Simple rotation animation on click
        animate({
            targets: '.theme-toggle-icon',
            rotate: '+=360deg',
            duration: 500,
            easing: 'easeOutElastic(1, .6)'
        });
    };

    return (
        <button
            className="theme-toggle"
            onClick={handleClick}
            aria-label="Toggle theme"
            style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '40px',
                height: '40px'
            }}
        >
            <span className="theme-toggle-icon" style={{ fontSize: '1.2rem', lineHeight: 1 }}>
                {isDark ? '🌙' : '☀️'}
            </span>
        </button>
    );
}
