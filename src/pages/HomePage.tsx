import { AGENTS_BY_MODULE, MODULE_INFO } from '../data/agents';
import { WORKFLOWS } from '../data/workflows';
import { AgentCard } from '../components/AgentCard/AgentCard';
import type { BMADAgent, BMADModule } from '../types';

const MODULE_ORDER: BMADModule[] = ['core', 'bmb', 'bmm', 'cis'];

interface HomePageProps {
    onOpenAgent: (agent: BMADAgent) => void;
    onOpenParty: () => void;
}

export function HomePage({ onOpenAgent, onOpenParty }: HomePageProps) {
    return (
        <div className="page-content">
            {/* Hero */}
            <div className="home-hero">
                <div className="home-hero-greeting">Bem-vindo de volta, Giovanny</div>
                <h1 className="home-hero-title">
                    Sua plataforma de<br />
                    <span>IA para desenvolvimento</span>
                </h1>
                <p className="home-hero-subtitle">
                    Acione agentes especializados individualmente para tarefas focadas, ou ative
                    o Party Mode para discussões colaborativas com toda a equipe de IA.
                </p>
                <div className="home-stats">
                    <div className="home-stat">
                        <span className="home-stat-value">19</span>
                        <span className="home-stat-label">Agentes</span>
                    </div>
                    <div className="home-stat">
                        <span className="home-stat-value">42</span>
                        <span className="home-stat-label">Workflows</span>
                    </div>
                    <div className="home-stat">
                        <span className="home-stat-value">4</span>
                        <span className="home-stat-label">Módulos</span>
                    </div>
                    <div className="home-stat">
                        <span className="home-stat-value">PT-BR</span>
                        <span className="home-stat-label">Linguagem</span>
                    </div>
                </div>
            </div>

            {/* Party Mode CTA */}
            <div style={{
                display: 'flex',
                gap: 16,
                marginBottom: 40,
                alignItems: 'stretch',
            }}>
                <div
                    className="card"
                    style={{
                        flex: 1,
                        padding: 28,
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(244,63,94,0.1))',
                        borderColor: 'rgba(139,92,246,0.3)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20,
                    }}
                    onClick={onOpenParty}
                >
                    <div style={{ fontSize: 40 }}>🎉</div>
                    <div>
                        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
                            Party Mode
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 300 }}>
                            Convoque múltiplos agentes para uma discussão colaborativa em tempo real.
                            Cada agente contribui com sua perspectiva única.
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: 20, color: 'var(--text-muted)' }}>→</div>
                </div>

                <div
                    className="card"
                    style={{
                        width: 200,
                        padding: 28,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        cursor: 'pointer',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ fontSize: 32 }}>⚙️</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                        Workflows
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {WORKFLOWS.length} disponíveis
                    </div>
                </div>
            </div>

            {/* Modules & Agents */}
            {MODULE_ORDER.map(mod => {
                const info = MODULE_INFO[mod];
                const agents = AGENTS_BY_MODULE[mod];
                return (
                    <div key={mod} className="module-section">
                        <div className="module-header">
                            <div
                                className="module-badge"
                                style={{
                                    background: `${info.color}18`,
                                    color: info.color,
                                }}
                            >
                                <span>{info.icon}</span>
                                <span>{info.label}</span>
                            </div>
                            <div className="module-header-info">
                                <p>{info.description}</p>
                            </div>
                        </div>
                        <div className="agents-grid">
                            {agents.map(agent => (
                                <AgentCard key={agent.name} agent={agent} onClick={onOpenAgent} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
