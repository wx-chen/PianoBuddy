const { useContext } = React;

window.BuddySelector = () => {
    // Access globals
    const AppContext = window.AppContext;
    const buddies = window.buddies;

    const { setCurrentBuddyId, setView, goals } = useContext(AppContext);

    const handleSelect = (buddyId) => {
        setCurrentBuddyId(buddyId);
        // If no goals set, go to settings, else practice
        if (goals.length === 0) {
            setView('settings');
        } else {
            setView('practice');
        }
    };

    return (
        <div className="buddy-selector-container" style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Fredoka, sans-serif', color: '#2D2D2D', marginBottom: '1rem' }}>
                Pick Your Piano Buddy!
            </h1>
            <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
                Who will practice with you today?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {buddies.map(buddy => (
                    <div
                        key={buddy.id}
                        onClick={() => handleSelect(buddy.id)}
                        className="btn"
                        style={{
                            background: buddy.color,
                            borderRadius: '24px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
                        }}
                    >
                        <img
                            src={buddy.assets.happy}
                            alt={buddy.name}
                            style={{ width: '120px', height: '120px', objectFit: 'contain', marginBottom: '1rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                        />
                        <span style={{
                            fontFamily: 'Fredoka, sans-serif',
                            fontSize: '1.25rem',
                            color: 'white'
                        }}>
                            {buddy.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
