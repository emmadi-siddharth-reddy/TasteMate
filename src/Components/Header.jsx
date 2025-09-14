export function Header({ useAI, setUseAI }) {
    return (
        <header className="app-header">
            <div className="logo-title">
                <img className="app-logo" src="/images/chef-claude-icon.png" alt="Icon Image" />
                <h1 className="app-title">TasteMate</h1>
            </div>

            <div className="toggle-container">
                <span>{useAI ? "AI Recipes" : "TheMealDB Recipes"}</span>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={useAI} 
                        onChange={(e) => setUseAI(e.target.checked)} 
                    />
                    <span className="slider"></span>
                </label>
            </div>
        </header>
    )
}
