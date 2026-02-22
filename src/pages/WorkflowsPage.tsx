import { WORKFLOWS } from '../data/workflows';
import type { BMADModule } from '../types';

const MODULE_COLORS: Record<BMADModule, string> = {
    core: '#F59E0B',
    bmb: '#06B6D4',
    bmm: '#8B5CF6',
    cis: '#F43F5E',
};

const PHASE_ICONS: Record<string, string> = {
    'análise': '🔍',
    'planejamento': '📐',
    'solucionamento': '⚙️',
    'implementação': '💻',
    'quick-flow': '🚀',
    'documentação': '📚',
    'diagramas': '📊',
    'testes': '🧪',
    'criativo': '✨',
    'construção': '🔧',
    'ideação': '💡',
    'colaboração': '🤝',
};

export function WorkflowsPage() {
    // Group by phase
    const phases = [...new Set(WORKFLOWS.map(w => w.phase || 'outros'))];

    return (
        <div className="page-content">
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>
                    Workflows
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                    {WORKFLOWS.length} workflows distribuídos em {phases.length} fases
                </p>
            </div>

            {phases.map(phase => {
                const wfs = WORKFLOWS.filter(w => (w.phase || 'outros') === phase);
                return (
                    <div key={phase} style={{ marginBottom: 36 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <span style={{ fontSize: 18 }}>{PHASE_ICONS[phase] || '⚡'}</span>
                            <h2 style={{
                                fontSize: 14,
                                fontWeight: 800,
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.8px',
                            }}>
                                {phase}
                            </h2>
                            <div style={{
                                flex: 1,
                                height: 1,
                                background: 'var(--border)',
                                marginLeft: 8,
                            }} />
                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{wfs.length}</span>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: 12,
                        }}>
                            {wfs.map(wf => {
                                const color = MODULE_COLORS[wf.module];
                                return (
                                    <div
                                        key={wf.name}
                                        className="card"
                                        style={{
                                            padding: 18,
                                            cursor: 'pointer',
                                            borderLeft: `3px solid ${color}40`,
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                            <div>
                                                <div style={{
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: 'var(--text-primary)',
                                                    marginBottom: 4,
                                                }}>
                                                    {wf.name}
                                                </div>
                                                <div style={{
                                                    fontSize: 12,
                                                    color: 'var(--text-secondary)',
                                                    lineHeight: 1.4,
                                                }}>
                                                    {wf.description}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 12 }}>
                                            <span
                                                className="tag"
                                                style={{ background: `${color}15`, color }}
                                            >
                                                {wf.module.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
