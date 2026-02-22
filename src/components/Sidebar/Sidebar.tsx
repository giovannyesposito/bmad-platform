import { useState } from 'react';
import { AGENTS, AGENTS_BY_MODULE, MODULE_INFO } from '../../data/agents';
import type { BMADModule } from '../../types';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string, agentName?: string) => void;
}

const MODULE_ORDER: BMADModule[] = ['core', 'bmb', 'bmm', 'cis'];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    const [expandedModules, setExpandedModules] = useState<Set<BMADModule>>(
        new Set(['core', 'bmm'])
    );

    const toggleModule = (mod: BMADModule) => {
        setExpandedModules(prev => {
            const next = new Set(prev);
            next.has(mod) ? next.delete(mod) : next.add(mod);
            return next;
        });
    };

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">⚡</div>
                <div className="sidebar-logo-text">
                    <span className="logo-title">FlowForge AI</span>
                    <span className="logo-subtitle">AI Development Suite</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
                {/* Home */}
                <div className="sidebar-section-label">Início</div>
                <button
                    className={`sidebar-nav-item ${currentPage === 'home' ? 'active' : ''}`}
                    style={{ '--mmm-color': '#8B5CF6' } as React.CSSProperties}
                    onClick={() => onNavigate('home')}
                >
                    <span className="sidebar-nav-icon">🏠</span>
                    <span className="sidebar-nav-text">Dashboard</span>
                </button>
                <button
                    className={`sidebar-nav-item ${currentPage === 'workflows' ? 'active' : ''}`}
                    style={{ '--mmm-color': '#06B6D4' } as React.CSSProperties}
                    onClick={() => onNavigate('workflows')}
                >
                    <span className="sidebar-nav-icon">⚙️</span>
                    <span className="sidebar-nav-text">Workflows</span>
                </button>

                {/* Party Mode CTA */}
                <div style={{ padding: '12px 16px 4px' }}>
                    <button
                        className="sidebar-party-btn"
                        onClick={() => onNavigate('party')}
                    >
                        🎉 Party Mode
                    </button>
                </div>

                {/* Modules */}
                <div className="sidebar-section-label" style={{ marginTop: 20 }}>Agentes</div>
                {MODULE_ORDER.map(mod => {
                    const info = MODULE_INFO[mod];
                    const agents = AGENTS_BY_MODULE[mod];
                    const isExpanded = expandedModules.has(mod);

                    return (
                        <div key={mod}>
                            <button
                                className="sidebar-nav-item"
                                onClick={() => toggleModule(mod)}
                                style={{ fontWeight: 700, color: info.color }}
                            >
                                <span className="sidebar-nav-icon">{info.icon}</span>
                                <span className="sidebar-nav-text">{info.label}</span>
                                <span style={{ fontSize: 10, marginLeft: 'auto', opacity: 0.6 }}>
                                    {isExpanded ? '▼' : '▶'}
                                </span>
                            </button>
                            {isExpanded && agents.map(agent => (
                                <button
                                    key={agent.name}
                                    className={`sidebar-nav-item ${currentPage === `agent:${agent.name}` ? 'active' : ''}`}
                                    style={{
                                        paddingLeft: 36,
                                        '--mmm-color': agent.color,
                                    } as React.CSSProperties}
                                    onClick={() => onNavigate(`agent:${agent.name}`, agent.name)}
                                >
                                    <span className="sidebar-nav-icon" style={{ fontSize: 12 }}>
                                        {agent.icon}
                                    </span>
                                    <span className="sidebar-nav-text">{agent.displayName}</span>
                                </button>
                            ))}
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="sidebar-user-avatar">G</div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">Giovanny</div>
                        <div className="sidebar-user-role">PT-BR · {AGENTS.length} agentes</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
