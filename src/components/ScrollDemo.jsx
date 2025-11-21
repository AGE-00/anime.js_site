import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export default function ScrollDemo() {
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animate({
                            targets: entry.target,
                            translateY: [100, 0],
                            opacity: [0, 1],
                            easing: 'easeOutExpo',
                            duration: 1200,
                            delay: stagger(100)
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        itemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="scroll-demo-section" style={{ padding: '100px 20px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '60px' }}>Scroll to Animate</h2>
            <div className="scroll-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {[1, 2, 3, 4].map((num, i) => (
                    <div
                        key={num}
                        ref={el => itemsRef.current[i] = el}
                        className="scroll-item"
                        style={{
                            opacity: 0, // Start hidden
                            background: 'var(--card-bg)',
                            padding: '40px',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}
                    >
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '20px',
                            background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            0{num}
                        </div>
                        <h3>Feature {num}</h3>
                        <p style={{ opacity: 0.7 }}>
                            This element animates into view when you scroll down.
                            Smooth and performant.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
