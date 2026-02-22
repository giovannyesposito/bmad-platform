import { useState, useRef, useEffect } from 'react';
import { AGENTS } from '../../data/agents';
import type { BMADAgent, ChatMessage } from '../../types';

interface PartyRoomProps {
    onBack: () => void;
}

function selectRelevantAgents(message: string, activeAgents: string[], all: BMADAgent[]): BMADAgent[] {
    const lower = message.toLowerCase();
    const active = all.filter(a => activeAgents.includes(a.name));
    if (active.length === 0) return all.slice(0, 3);

    // Selecionar 2-3 agentes mais relevantes baseado no conteúdo
    const scored = active.map(agent => {
        let score = 0;
        const combined = `${agent.role} ${agent.identity} ${agent.principles}`.toLowerCase();

        if (lower.includes('produto') || lower.includes('prd') || lower.includes('requisit')) {
            if (agent.name === 'pm' || agent.name === 'analyst') score += 3;
        }
        if (lower.includes('código') || lower.includes('implementa') || lower.includes('develop')) {
            if (agent.name === 'dev' || agent.name === 'architect') score += 3;
        }
        if (lower.includes('test') || lower.includes('qualidade')) {
            if (agent.name === 'tea') score += 3;
        }
        if (lower.includes('design') || lower.includes('ux') || lower.includes('interface')) {
            if (agent.name === 'ux-designer') score += 3;
        }
        if (lower.includes('ideia') || lower.includes('criativ') || lower.includes('brainstorm')) {
            if (agent.name === 'brainstorming-coach' || agent.name === 'creative-problem-solver') score += 3;
        }
        if (lower.includes('história') || lower.includes('sprint') || lower.includes('épico')) {
            if (agent.name === 'sm') score += 3;
        }

        // Base match on role keywords
        const words = lower.split(' ').filter(w => w.length > 3);
        words.forEach(word => {
            if (combined.includes(word)) score += 1;
        });

        return { agent, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, Math.min(3, scored.length)).map(s => s.agent);
}

const PARTY_GREETINGS = [
    '🎉 **PARTY MODE ATIVADO!** 🎉',
    '',
    'Olá, Giovanny! Todos os agentes BMAD estão aqui e prontos para uma discussão colaborativa dinâmica.',
    '',
    '**Selecione os agentes** que deseja incluir na conversa usando os chips acima.',
    'Por padrão, o sistema selecionará automaticamente os 2-3 agentes mais relevantes para cada mensagem.',
    '',
    '*O que você gostaria de discutir com a equipe hoje?*',
    '',
    '💡 *Dica: Digite "exit" ou "sair" para encerrar o Party Mode*',
];

export function PartyRoom({ onBack }: PartyRoomProps) {
    const [activeAgents, setActiveAgents] = useState<string[]>(
        AGENTS.map(a => a.name)
    );
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '0',
            role: 'system',
            content: PARTY_GREETINGS.join('\n'),
            agentDisplayName: 'BMAD Master',
            agentIcon: '🧙',
            agentColor: '#F59E0B',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [respondingAgents, setRespondingAgents] = useState<BMADAgent[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const toggleAgent = (name: string) => {
        setActiveAgents(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;
        if (text.toLowerCase() === 'exit' || text.toLowerCase() === 'sair') {
            onBack();
            return;
        }

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        const selected = selectRelevantAgents(text, activeAgents, AGENTS);
        setRespondingAgents(selected);

        // Simula respostas sequenciais de cada agente
        for (let i = 0; i < selected.length; i++) {
            await new Promise(r => setTimeout(r, 800 + i * 600));
            const agent = selected[i];
            const agentMsg: ChatMessage = {
                id: `${Date.now()}-${i}`,
                role: 'agent',
                content: getPartyResponse(agent, text, i),
                agentName: agent.name,
                agentIcon: agent.icon,
                agentColor: agent.color,
                agentDisplayName: agent.displayName,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, agentMsg]);
        }

        setIsTyping(false);
        setRespondingAgents([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <div className="chat-layout">
            {/* Party Header */}
            <div className="party-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <button className="btn btn-ghost" style={{ padding: '6px 10px' }} onClick={onBack}>←</button>
                    <div className="party-title">🎉 Party Mode</div>
                    <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>
                        {activeAgents.length}/{AGENTS.length} agentes ativos
                    </div>
                </div>

                {/* Agent chips */}
                <div className="party-agents-selector">
                    {AGENTS.map(agent => (
                        <button
                            key={agent.name}
                            className={`party-agent-chip ${activeAgents.includes(agent.name) ? 'selected' : ''}`}
                            style={{
                                '--chip-color': agent.color,
                                '--chip-dim': `${agent.color}20`,
                            } as React.CSSProperties}
                            onClick={() => toggleAgent(agent.name)}
                            title={agent.title}
                        >
                            <span className="party-agent-chip-icon">{agent.icon}</span>
                            {agent.displayName}
                        </button>
                    ))}
                </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`message ${msg.role === 'user' ? 'user-message' : 'agent-message'}`}
                    >
                        <div
                            className="message-avatar"
                            style={msg.role !== 'user' ? { background: `${msg.agentColor}25` } : undefined}
                        >
                            {msg.role === 'user' ? 'G' : msg.agentIcon}
                        </div>
                        <div className="message-body">
                            {msg.role !== 'user' && (
                                <div className="party-message-header">
                                    <span
                                        className="party-message-agent-name"
                                        style={{ color: msg.agentColor }}
                                    >
                                        {msg.agentDisplayName}
                                    </span>
                                </div>
                            )}
                            {msg.role === 'user' && (
                                <div className="message-name">Giovanny</div>
                            )}
                            <div
                                className="message-bubble"
                                style={msg.role !== 'user' ? {
                                    borderLeft: `3px solid ${msg.agentColor}`,
                                    borderColor: `${msg.agentColor}25`,
                                } : undefined}
                            >
                                <div
                                    className="message-content"
                                    dangerouslySetInnerHTML={{
                                        __html: msg.content
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                            .replace(/`(.*?)`/g, '<code>$1</code>')
                                    }}
                                />
                            </div>
                            <div className="message-time">
                                {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {respondingAgents.map(agent => (
                            <div key={agent.name} className="message agent-message">
                                <div className="message-avatar" style={{ background: `${agent.color}25` }}>
                                    {agent.icon}
                                </div>
                                <div className="message-body">
                                    <div className="party-message-header">
                                        <span className="party-message-agent-name" style={{ color: agent.color }}>
                                            {agent.displayName}
                                        </span>
                                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>digitando...</span>
                                    </div>
                                    <div className="message-bubble" style={{ borderLeft: `3px solid ${agent.color}` }}>
                                        <div className="typing-indicator">
                                            <div className="typing-dot" style={{ background: agent.color }} />
                                            <div className="typing-dot" style={{ background: agent.color }} />
                                            <div className="typing-dot" style={{ background: agent.color }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-area">
                <div className="chat-input-row">
                    <textarea
                        className="chat-input"
                        placeholder="Digite para a equipe de agentes... (Enter para enviar)"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />
                    <button
                        className="send-btn"
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isTyping}
                        style={{ background: 'linear-gradient(135deg, #8B5CF6, #F43F5E)' }}
                    >
                        ↑
                    </button>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>
                    🔒 Modo UI · {activeAgents.length} agentes · 2-3 respondem por mensagem baseado em relevância
                </div>
            </div>
        </div>
    );
}

function getPartyResponse(agent: BMADAgent, message: string, index: number): string {
    const prefixes = [
        `**${agent.displayName}** aqui! `,
        `[**${agent.displayName}** entra na conversa] `,
        `*${agent.displayName} reflete um momento...* `,
    ];
    const prefix = prefixes[index % prefixes.length];

    return `${prefix}

[*Resposta simulada — UI demo*]

Sobre a sua pergunta *"${message.substring(0, 60)}${message.length > 60 ? '...' : ''}"*:

Como **${agent.title}**, minha perspectiva é diretamente influenciada pelo meu papel: ${agent.role.substring(0, 100)}...

Meu estilo: *"${agent.communicationStyle.substring(0, 80)}..."*

🔒 *Configure um modelo de IA para respostas reais.*`;
}
