const { useContext, useEffect, useState } = React;

window.BuddyDisplay = ({ buddyId, mood, message }) => {
    // Access globals
    const buddies = window.buddies;

    const buddy = buddies.find(b => b.id === buddyId);

    if (!buddy) return null;

    const asset = buddy.assets[mood] || buddy.assets.happy;

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Speech Bubble */}
            {message && (
                <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '24px',
                    borderBottomLeftRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    marginBottom: '1rem',
                    maxWidth: '200px',
                    textAlign: 'center',
                    animation: 'popIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                    fontFamily: 'Fredoka, sans-serif',
                    color: '#2D2D2D'
                }}>
                    {message}
                </div>
            )}

            {/* Character Image */}
            <img
                src={asset}
                alt={`${buddy.name} is ${mood}`}
                style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'contain',
                    transition: 'all 0.5s ease'
                }}
            />

            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};
