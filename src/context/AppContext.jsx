const { createContext, useState, useEffect } = React;

window.AppContext = createContext();

window.AppProvider = ({ children }) => {
    // Persistent State (could use localStorage in future)
    const [currentBuddyId, setCurrentBuddyId] = useState(null); // 'melody' or 'rhythm'
    const [view, setView] = useState('onboarding'); // 'onboarding', 'practice', 'settings'

    // Goals: Array of { id, tuneName, targetCount, currentCount }
    const [goals, setGoals] = useState([]);

    // Settings
    const [inactivityThreshold, setInactivityThreshold] = useState(5); // Minutes

    // Helper to add a goal
    const addGoal = (tuneName, targetCount) => {
        const newGoal = {
            id: Date.now().toString(),
            tuneName,
            targetCount: parseInt(targetCount),
            currentCount: 0
        };
        setGoals(prev => [...prev, newGoal]);
    };

    // Helper to remove a goal
    const removeGoal = (id) => {
        setGoals(prev => prev.filter(g => g.id !== id));
    };

    // Helper to update progress
    const incrementProgress = (id) => {
        setGoals(prev => prev.map(g => {
            if (g.id === id) {
                return { ...g, currentCount: g.currentCount + 1 };
            }
            return g;
        }));
    };

    const resetDailyProgress = () => {
        setGoals(prev => prev.map(g => ({ ...g, currentCount: 0 })));
    };

    const value = {
        currentBuddyId,
        setCurrentBuddyId,
        view,
        setView,
        goals,
        addGoal,
        removeGoal,
        incrementProgress,
        resetDailyProgress,
        inactivityThreshold,
        setInactivityThreshold
    };

    return (
        <window.AppContext.Provider value={value}>
            {children}
        </window.AppContext.Provider>
    );
};
