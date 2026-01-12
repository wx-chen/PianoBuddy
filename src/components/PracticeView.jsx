const { useContext, useState, useEffect, useRef } = React;

window.PracticeView = () => {
    // Access globals
    const AppContext = window.AppContext;
    const quotes = window.quotes;
    const BuddyDisplay = window.BuddyDisplay;

    const {
        currentBuddyId,
        goals,
        incrementProgress,
        inactivityThreshold,
        setView
    } = useContext(AppContext);

    const [mood, setMood] = useState('happy');
    const [message, setMessage] = useState('');
    const lastInteractionRef = useRef(Date.now());
    const [_, setTick] = useState(0); // Force re-render for timer checks

    // Inactivity Timer
    useEffect(() => {
        const interval = setInterval(() => {
            const elapsedMinutes = (Date.now() - lastInteractionRef.current) / 60000;

            if (elapsedMinutes >= inactivityThreshold) {
                setMood('sleepy');
            } else if (elapsedMinutes >= inactivityThreshold / 2) {
                setMood('anxious');
            } else {
                if (mood !== 'happy') setMood('happy');
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [inactivityThreshold, mood]);

    // Handle User Action
    const handleProgress = (goalId) => {
        lastInteractionRef.current = Date.now();
        setMood('happy');
        incrementProgress(goalId);

        // Trigger generic encouragement
        const randomQuote = quotes.happy[Math.floor(Math.random() * quotes.happy.length)];
        setMessage(randomQuote);

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
    };

    const handleInteraction = () => {
        lastInteractionRef.current = Date.now();
        if (mood === 'sleepy') {
            setMood('happy');
            setMessage("I'm awake! Let's play!");
            setTimeout(() => setMessage(''), 3000);
        }
    };

    // Derived State: Daily Progress
    const totalTarget = goals.reduce((acc, g) => acc + g.targetCount, 0);
    const totalCurrent = goals.reduce((acc, g) => acc + g.currentCount, 0);
    const overallProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

    return (
        <div
            onClick={handleInteraction}
            style={{
                padding: '2rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: mood === 'sleepy' ? '#F3F4F6' : 'white',
                transition: 'background 1s ease'
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                    onClick={(e) => { e.stopPropagation(); setView('settings'); }}
                    style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}
                >
                    ⚙️ Settings
                </button>
                <div style={{ fontFamily: 'Fredoka, sans-serif', color: '#4BC2A5' }}>
                    {Math.round(overallProgress)}% Done Today
                </div>
            </div>

            {/* Buddy */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BuddyDisplay buddyId={currentBuddyId} mood={mood} message={message} />
            </div>

            {/* Goals List */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {goals.map(goal => {
                    const isDone = goal.currentCount >= goal.targetCount;
                    const progress = Math.min((goal.currentCount / goal.targetCount) * 100, 100);

                    return (
                        <div key={goal.id} style={{
                            background: '#F9FAFB',
                            borderRadius: '16px',
                            padding: '1rem',
                            border: isDone ? '2px solid #4BC2A5' : '1px solid #E5E7EB'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: '600' }}>{goal.tuneName}</span>
                                <span style={{ color: '#6B7280' }}>{goal.currentCount} / {goal.targetCount}</span>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', marginBottom: '1rem', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    background: isDone ? '#4BC2A5' : '#FF8F5E',
                                    transition: 'width 0.5s ease'
                                }}></div>
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleProgress(goal.id); }}
                                className="btn"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: isDone ? '#10B981' : '#2D2D2D',
                                    color: 'white',
                                    borderRadius: '12px'
                                }}
                            >
                                {isDone ? 'Great Job! Practice More?' : 'Finished One Time!'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
