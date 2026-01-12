// Access Globals
const AppContext = window.AppContext;
const AppProvider = window.AppProvider;
const BuddySelector = window.BuddySelector;
const ParentSettings = window.ParentSettings;
const PracticeView = window.PracticeView;

const App = () => {
    const { view } = React.useContext(AppContext);

    // View Router
    const renderView = () => {
        switch (view) {
            case 'onboarding':
                return <BuddySelector />;
            case 'settings':
                return <ParentSettings />;
            case 'practice':
                return <PracticeView />;
            default:
                return <BuddySelector />;
        }
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {renderView()}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <App />
    </AppProvider>
);
