import { useState, useRef, useEffect } from 'react';
import type { BMADAgent, ChatMessage } from '../../types';

interface ChatWindowProps {
    agent: BMADAgent;
    onBack: () => void;
}

function buildGreeting(agent: BMADAgent): string {
    return `Olá! Eu sou **${agent.displayName}**, ${agent.title}.

**Meu papel:** ${agent.role}

**Como posso ajudar?**
${agent.identity}

---
*Use os comandos abaixo para ações rápidas, ou simplesmente me diga o que precisa!*`;
}

// buildSystemPrompt será utilizado na integração LLM futura
export function _buildSystemPrompt(agent: BMADAgent): string {
    return `Você é ${agent.displayName}, ${agent.title}.

PAPEL: ${agent.role}

IDENTIDADE: ${agent.identity}

ESTILO DE COMUNICAÇÃO: ${agent.communicationStyle}

PRINCÍPIOS:
${agent.principles}

REGRAS:
- Sempre comunique-se em Português do Brasil (PT-BR)
- Mantenha sua persona de forma consistente durante toda a conversa
- Seja fiel ao seu estilo de comunicação descrito acima
- O usuário se chama Giovanny
- Modulo: ${agent.module.toUpperCase()}

Você está em uma plataforma web de IA para desenvolvimento de projetos chamada BMAD Platform.`;
}

export function ChatWindow({ agent, onBack }: ChatWindowProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'system',
            content: buildGreeting(agent),
            agentName: agent.name,
            agentIcon: agent.icon,
            agentColor: agent.color,
            agentDisplayName: agent.displayName,
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);


    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Por enquanto, simula resposta (UI-first)
            await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

            const simulatedReply: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: getSimulatedResponse(agent, text),
                agentName: agent.name,
                agentIcon: agent.icon,
                agentColor: agent.color,
                agentDisplayName: agent.displayName,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, simulatedReply]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleCommand = (cmd: string, label: string) => {
        sendMessage(`[${cmd}] ${label}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const showCommands = messages.length === 1;

    return (
        <div className="chat-layout">
            {/* Header */}
            <div className="chat-header">
                <button
                    className="btn btn-ghost"
                    style={{ padding: '6px 10px', marginRight: 4 }}
                    onClick={onBack}
                >
                    ←
                </button>
                <div
                    className="chat-agent-icon"
                    style={{ background: `${agent.color}20` }}
                >
                    {agent.icon}
                </div>
                <div>
                    <div className="chat-agent-name">{agent.displayName}</div>
                    <div className="chat-agent-title">{agent.title}</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                    <span
                        className="tag"
                        style={{
                            background: `${agent.color}18`,
                            color: agent.color,
                        }}
                    >
                        {agent.module.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`message ${msg.role === 'user' ? 'user-message' : 'agent-message'}`}
                    >
                        {/* Avatar */}
                        <div
                            className="message-avatar"
                            style={msg.role !== 'user' ? { background: `${agent.color}20` } : undefined}
                        >
                            {msg.role === 'user' ? 'G' : msg.agentIcon}
                        </div>

                        {/* Body */}
                        <div className="message-body">
                            <div className="message-name">
                                {msg.role === 'user' ? 'Giovanny' : msg.agentDisplayName}
                            </div>
                            <div
                                className="message-bubble"
                                style={msg.role !== 'user' ? {
                                    borderColor: `${agent.color}20`,
                                } : undefined}
                            >
                                <div
                                    className="message-content"
                                    dangerouslySetInnerHTML={{
                                        __html: msg.content
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                            .replace(/`(.*?)`/g, '<code>$1</code>')
                                            .replace(/---/g, '<hr style="border-color:rgba(255,255,255,0.08);margin:8px 0">')
                                    }}
                                />
                                {/* Comandos do agente na primeira mensagem */}
                                {msg.role !== 'user' && showCommands && msg.id === '1' && (
                                    <div className="command-menu">
                                        {agent.commands.filter(c => c.cmd !== 'DA' && c.cmd !== 'MH').map(cmd => (
                                            <button
                                                key={cmd.cmd}
                                                className="command-btn"
                                                onClick={() => handleCommand(cmd.cmd, cmd.label)}
                                                style={{ borderColor: `${agent.color}30`, color: agent.color }}
                                            >
                                                [{cmd.cmd}] {cmd.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="message-time">
                                {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="message agent-message">
                        <div
                            className="message-avatar"
                            style={{ background: `${agent.color}20` }}
                        >
                            {agent.icon}
                        </div>
                        <div className="message-body">
                            <div className="message-name">{agent.displayName}</div>
                            <div className="message-bubble" style={{ borderColor: `${agent.color}20` }}>
                                <div className="typing-indicator">
                                    <div className="typing-dot" style={{ background: agent.color }} />
                                    <div className="typing-dot" style={{ background: agent.color }} />
                                    <div className="typing-dot" style={{ background: agent.color }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-area">
                <div className="chat-input-row">
                    <textarea
                        ref={inputRef}
                        className="chat-input"
                        placeholder={`Fale com ${agent.displayName}... (Enter para enviar, Shift+Enter para nova linha)`}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />
                    <button
                        className="send-btn"
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isTyping}
                        style={{ background: `linear-gradient(135deg, ${agent.color}, ${agent.accentColor}80)` }}
                    >
                        ↑
                    </button>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>
                    🔒 Modo UI • Integração LLM em breve · Sistema: {agent.displayName} · {agent.module.toUpperCase()}
                </div>
            </div>
        </div>
    );
}

// Respostas simuladas contextualmente por agente - UI demo
function getSimulatedResponse(agent: BMADAgent, message: string): string {
    const lower = message.toLowerCase();

    if (lower.includes('[ch]') || lower.includes('chat')) {
        return `Claro, ${agent.displayName} está pronto para conversar! 

Como posso ajudar você no seu projeto? Aqui estão algumas coisas que posso fazer:

- **Analisar** requisitos e necessidades
- **Discutir** estratégias e abordagens  
- **Guiar** você em decisões importantes
- **Colaborar** em qualquer aspecto relacionado ao meu papel

O que você tem em mente?`;
    }

    return `[**${agent.displayName}** — resposta simulada para demonstração da UI]

Recebi sua mensagem: *"${message}"*

🔒 **Integração LLM ainda não ativa.** 

Quando conectada a um modelo de IA, responderei com a persona de **${agent.displayName}** — ${agent.title} — utilizando meu estilo: *"${agent.communicationStyle.substring(0, 80)}..."*

Configure um modelo de IA nas configurações para ativar as respostas reais.`;
}
