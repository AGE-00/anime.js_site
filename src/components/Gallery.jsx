import { useEffect, useRef } from 'react';
import anime from 'animejs';

const StaggerDemo = () => {
    const gridRef = useRef(null);

    const animate = () => {
        anime({
            targets: gridRef.current.children,
            scale: [
                { value: .1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1200 }
            ],
            delay: anime.stagger(200, { grid: [5, 5], from: 'center' })
        });
    };

    return (
        <div
            className="demo-card"
            onMouseEnter={animate}
            onClick={animate}
        >
            <h3>Staggering</h3>
            <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px', width: '150px', height: '150px', margin: '20px auto' }}>
                {[...Array(25)].map((_, i) => (
                    <div key={i} style={{ background: 'var(--primary-color)', borderRadius: '50%' }}></div>
                ))}
            </div>
            <p>Grid staggering effects</p>
        </div>
    );
};

const MorphDemo = () => {
    const shapeRef = useRef(null);

    const animate = () => {
        anime({
            targets: shapeRef.current,
            borderRadius: ['0%', '50%'],
            rotate: '1turn',
            backgroundColor: ['#646cff', '#535bf2'],
            duration: 2000,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
    };

    return (
        <div
            className="demo-card"
            onMouseEnter={animate}
            onClick={animate}
        >
            <h3>Morph & Rotate</h3>
            <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px auto' }}>
                <div
                    ref={shapeRef}
                    style={{ width: '80px', height: '80px', background: 'var(--primary-color)' }}
                ></div>
            </div>
            <p>Shape and property morphing</p>
        </div>
    );
};

const PathDemo = () => {
    const ballRef = useRef(null);

    const animate = () => {
        // Simple translation demo since SVG path data needs more setup
        anime({
            targets: ballRef.current,
            translateX: 100,
            translateY: [
                { value: -50, duration: 500, easing: 'easeOutQuad' },
                { value: 0, duration: 800, easing: 'easeOutBounce' }
            ],
            duration: 1300,
            loop: 2,
            direction: 'alternate'
        });
    };

    return (
        <div
            className="demo-card"
            onMouseEnter={animate}
            onClick={animate}
        >
            <h3>Motion & Bounce</h3>
            <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '40px', margin: '20px auto' }}>
                <div
                    ref={ballRef}
                    style={{ width: '40px', height: '40px', background: 'var(--secondary-color)', borderRadius: '50%' }}
                ></div>
            </div>
            <p>Complex keyframes</p>
        </div>
    );
};

export default function Gallery() {
    return (
        <section className="gallery-section" style={{ padding: '80px 20px', background: 'var(--card-bg)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>Animation Gallery</h2>
            <div className="gallery-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <StaggerDemo />
                <MorphDemo />
                <PathDemo />
            </div>
            <style>{`
        .demo-card {
          background: var(--bg-color);
          padding: 30px;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .demo-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
        }
        .demo-card h3 {
          margin-top: 0;
        }
      `}</style>
        </section>
    );
}
