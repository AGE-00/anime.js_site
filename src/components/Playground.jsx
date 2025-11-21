import { useState, useRef } from 'react';
import { animate } from 'animejs';

export default function Playground() {
    const boxRef = useRef(null);
    const [params, setParams] = useState({
        duration: 1000,
        scale: 1.5,
        rotate: 360,
        easing: 'easeInOutQuad'
    });

    const handlePlay = () => {
        animate({
            targets: boxRef.current,
            scale: [1, params.scale],
            rotate: [0, params.rotate],
            duration: params.duration,
            easing: params.easing,
            direction: 'alternate',
            loop: 1
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParams(prev => ({
            ...prev,
            [name]: name === 'easing' ? value : Number(value)
        }));
    };

    return (
        <section className="playground-section" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h2>Interactive Playground</h2>
            <p style={{ marginBottom: '40px', opacity: 0.8 }}>Tweak the values and see the magic happen.</p>

            <div className="playground-container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>

                <div className="controls" style={{
                    textAlign: 'left',
                    background: 'var(--card-bg)',
                    padding: '30px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    minWidth: '300px'
                }}>
                    <div className="control-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Duration: {params.duration}ms</label>
                        <input
                            type="range"
                            name="duration"
                            min="200"
                            max="3000"
                            step="100"
                            value={params.duration}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="control-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Scale: {params.scale}x</label>
                        <input
                            type="range"
                            name="scale"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={params.scale}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="control-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Rotate: {params.rotate}deg</label>
                        <input
                            type="range"
                            name="rotate"
                            min="0"
                            max="720"
                            step="45"
                            value={params.rotate}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="control-group" style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Easing</label>
                        <select
                            name="easing"
                            value={params.easing}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-color)',
                                color: 'var(--text-color)'
                            }}
                        >
                            <option value="linear">linear</option>
                            <option value="easeInOutQuad">easeInOutQuad</option>
                            <option value="easeOutElastic">easeOutElastic</option>
                            <option value="spring(1, 80, 10, 0)">spring</option>
                        </select>
                    </div>

                    <button className="cta-button" onClick={handlePlay} style={{ width: '100%' }}>
                        Play Animation
                    </button>
                </div>

                <div className="preview-area" style={{
                    width: '300px',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '16px'
                }}>
                    <div
                        ref={boxRef}
                        className="anim-box"
                        style={{
                            width: '100px',
                            height: '100px',
                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                    ></div>
                </div>

            </div>
        </section>
    );
}
