import type { BMADAgent } from '../../types';
import { MODULE_INFO } from '../../data/agents';

interface AgentCardProps {
    agent: BMADAgent;
    onClick: (agent: BMADAgent) => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
    const moduleInfo = MODULE_INFO[agent.module];

    return (
        <div
            className="agent-card"
            style={{ '--agent-color': agent.color } as React.CSSProperties}
            onClick={() => onClick(agent)}
        >
            <div className="agent-card-header">
                <div className="agent-icon" style={{ background: `${agent.color}20` }}>
                    <div
                        className="agent-icon-glow"
                        style={{ background: agent.color }}
                    />
                    <span style={{ position: 'relative', zIndex: 1 }}>{agent.icon}</span>
                </div>
                <div className="agent-card-names">
                    <div className="agent-display-name">{agent.displayName}</div>
                    <div className="agent-title">{agent.title}</div>
                </div>
            </div>

            <div className="agent-role">{agent.role}</div>

            <div className="agent-card-footer">
                <span
                    className="agent-module-tag"
                    style={{
                        background: `${agent.color}18`,
                        color: agent.color,
                    }}
                >
                    {moduleInfo.label.split(' ')[0]}
                </span>
                <span className="agent-open-btn">
                    Conversar →
                </span>
            </div>
        </div>
    );
}
