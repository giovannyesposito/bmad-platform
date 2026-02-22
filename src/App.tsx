import { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { HomePage } from './pages/HomePage';
import { ChatWindow } from './components/ChatWindow/ChatWindow';
import { PartyRoom } from './components/PartyMode/PartyRoom';
import { WorkflowsPage } from './pages/WorkflowsPage';
import type { BMADAgent } from './types';
import { getAgent } from './data/agents';

type Page =
  | { id: 'home' }
  | { id: 'agent'; agentName: string }
  | { id: 'party' }
  | { id: 'workflows' };

function getPageKey(page: Page): string {
  if (page.id === 'agent') return `agent:${page.agentName}`;
  return page.id;
}

function getTopbarInfo(page: Page, agent?: BMADAgent) {
  switch (page.id) {
    case 'home': return { title: 'Dashboard', subtitle: 'Plataforma BMAD de IA' };
    case 'party': return { title: '🎉 Party Mode', subtitle: 'Sessão colaborativa multi-agente' };
    case 'workflows': return { title: 'Workflows', subtitle: 'Fluxos de trabalho disponíveis' };
    case 'agent': return {
      title: agent ? `${agent.icon} ${agent.displayName}` : 'Agente',
      subtitle: agent?.title || '',
    };
    default: return { title: 'BMAD', subtitle: '' };
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ id: 'home' });

  const navigate = (pageStr: string, agentName?: string) => {
    if (pageStr === 'home') setCurrentPage({ id: 'home' });
    else if (pageStr === 'party') setCurrentPage({ id: 'party' });
    else if (pageStr === 'workflows') setCurrentPage({ id: 'workflows' });
    else if (pageStr.startsWith('agent:') && agentName) {
      setCurrentPage({ id: 'agent', agentName });
    }
  };

  const openAgent = (agent: BMADAgent) => {
    setCurrentPage({ id: 'agent', agentName: agent.name });
  };

  const goBack = () => setCurrentPage({ id: 'home' });

  const currentAgent = currentPage.id === 'agent'
    ? getAgent(currentPage.agentName)
    : undefined;

  const topbar = getTopbarInfo(currentPage, currentAgent);
  const pageKey = getPageKey(currentPage);

  const isFullscreenPage = currentPage.id === 'agent' || currentPage.id === 'party';

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={pageKey}
        onNavigate={navigate}
      />

      <main className="main-content">
        {/* Topbar — só mostra em páginas não-fullscreen */}
        {!isFullscreenPage && (
          <div className="topbar">
            <div>
              <div className="topbar-title">{topbar.title}</div>
              {topbar.subtitle && (
                <div className="topbar-subtitle">{topbar.subtitle}</div>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        {currentPage.id === 'home' && (
          <HomePage
            onOpenAgent={openAgent}
            onOpenParty={() => setCurrentPage({ id: 'party' })}
          />
        )}

        {currentPage.id === 'agent' && currentAgent && (
          <ChatWindow
            agent={currentAgent}
            onBack={goBack}
          />
        )}

        {currentPage.id === 'agent' && !currentAgent && (
          <div className="empty-state">
            <div className="empty-state-icon">❓</div>
            <div className="empty-state-title">Agente não encontrado</div>
            <button className="btn btn-ghost" onClick={goBack}>← Voltar</button>
          </div>
        )}

        {currentPage.id === 'party' && (
          <PartyRoom onBack={goBack} />
        )}

        {currentPage.id === 'workflows' && (
          <WorkflowsPage />
        )}
      </main>
    </div>
  );
}
