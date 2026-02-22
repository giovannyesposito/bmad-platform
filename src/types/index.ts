export type BMADModule = 'core' | 'bmb' | 'bmm' | 'cis';

export interface AgentCommand {
    cmd: string;
    label: string;
    type?: 'workflow' | 'exec' | 'action' | 'chat';
    target?: string;
}

export interface BMADAgent {
    name: string;
    displayName: string;
    title: string;
    icon: string;
    role: string;
    identity: string;
    communicationStyle: string;
    principles: string;
    module: BMADModule;
    path: string;
    commands: AgentCommand[];
    color: string;
    accentColor: string;
}

export interface BMADWorkflow {
    name: string;
    description: string;
    module: BMADModule;
    path: string;
    phase?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'agent' | 'system';
    content: string;
    agentName?: string;
    agentIcon?: string;
    agentColor?: string;
    agentDisplayName?: string;
    timestamp: Date;
}

export interface ChatSession {
    agentName: string;
    messages: ChatMessage[];
    startedAt: Date;
}

export interface PartySession {
    activeAgents: string[];
    messages: ChatMessage[];
    startedAt: Date;
}

export interface AppConfig {
    userName: string;
    language: string;
    selectedModel: string;
    apiKey: string;
}
