const { useContext, useState } = React;

window.ParentSettings = () => {
    // Access globals
    const AppContext = window.AppContext;

    const {
        goals,
        addGoal,
        removeGoal,
        inactivityThreshold,
        setInactivityThreshold,
        setView
    } = useContext(AppContext);

    const [tuneName, setTuneName] = useState('');
    const [counts, setCounts] = useState(5);

    const handleAdd = (e) => {
        e.preventDefault();
        if (tuneName.trim()) {
            addGoal(tuneName, counts);
            setTuneName('');
            setCounts(5);
        }
    };

    return (
        <div style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
            <h1 style={{ fontFamily: 'Fredoka, sans-serif', marginBottom: '1.5rem' }}>Settings</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Daily Goals</h2>

                {/* Add Goal Form */}
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Tune Name (e.g. Minuet in G)"
                        value={tuneName}
                        onChange={(e) => setTuneName(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '12px',
                            border: '1px solid #E5E7EB',
                            fontSize: '1rem'
                        }}
                    />
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={counts}
                        onChange={(e) => setCounts(e.target.value)}
                        style={{
                            width: '80px',
                            padding: '0.75rem',
                            borderRadius: '12px',
                            border: '1px solid #E5E7EB',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            background: '#2D2D2D',
                            color: 'white',
                            padding: '0 1.5rem',
                            borderRadius: '12px'
                        }}
                    >
                        Add
                    </button>
                </form>

                {/* List of Goals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {goals.map(goal => (
                        <div key={goal.id} style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid #E5E7EB',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <strong style={{ display: 'block' }}>{goal.tuneName}</strong>
                                <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Target: {goal.targetCount} times</span>
                            </div>
                            <button
                                onClick={() => removeGoal(goal.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#EF4444',
                                    cursor: 'pointer',
                                    padding: '0.5rem'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    {goals.length === 0 && <p style={{ color: '#9CA3AF', fontStyle: 'italic' }}>No goals added yet.</p>}
                </div>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Inactivity Timer</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label>Alert after</label>
                    <select
                        value={inactivityThreshold}
                        onChange={(e) => setInactivityThreshold(Number(e.target.value))}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB'
                        }}
                    >
                        <option value={1}>1 Minute (Test)</option>
                        <option value={5}>5 Minutes</option>
                        <option value={10}>10 Minutes</option>
                        <option value={15}>15 Minutes</option>
                    </select>
                    <label>of inactivity</label>
                </div>
            </section>

            <button
                className="btn"
                onClick={() => setView('practice')}
                disabled={goals.length === 0}
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: goals.length > 0 ? '#4BC2A5' : '#D1D5DB',
                    color: 'white',
                    fontSize: '1.2rem',
                    borderRadius: '16px',
                    marginTop: 'auto'
                }}
            >
                Start Practicing!
            </button>
        </div>
    );
};
