import { BMADWorkflow } from '../types';

export const WORKFLOWS: BMADWorkflow[] = [
    // CORE
    { name: 'brainstorming', description: 'Sessões interativas de brainstorming com técnicas criativas', module: 'core', path: '_bmad/core/workflows/brainstorming/workflow.md', phase: 'ideação' },
    { name: 'party-mode', description: 'Orquestra discussões em grupo entre todos os agentes BMAD instalados', module: 'core', path: '_bmad/core/workflows/party-mode/workflow.md', phase: 'colaboração' },
    // BMB
    { name: 'agent', description: 'Workflow tri-modal para criar, editar e validar agentes BMAD', module: 'bmb', path: '_bmad/bmb/workflows/agent/workflow.md', phase: 'construção' },
    { name: 'module', description: 'Workflow quad-modal para criar módulos BMAD', module: 'bmb', path: '_bmad/bmb/workflows/module/workflow.md', phase: 'construção' },
    { name: 'workflow', description: 'Criar workflows estruturados em markdown', module: 'bmb', path: '_bmad/bmb/workflows/workflow/workflow.md', phase: 'construção' },
    // BMM - Análise
    { name: 'create-product-brief', description: 'Criar product briefs abrangentes através de descoberta colaborativa', module: 'bmm', path: '_bmad/bmm/workflows/1-analysis/create-product-brief/workflow.md', phase: 'análise' },
    { name: 'research', description: 'Pesquisa abrangente: mercado, técnica, domínio', module: 'bmm', path: '_bmad/bmm/workflows/1-analysis/research/workflow.md', phase: 'análise' },
    // BMM - Planejamento
    { name: 'create-ux-design', description: 'Planejar UX patterns e look & feel da aplicação', module: 'bmm', path: '_bmad/bmm/workflows/2-plan-workflows/create-ux-design/workflow.md', phase: 'planejamento' },
    { name: 'prd', description: 'PRD tri-modal - Criar, Validar ou Editar PRDs', module: 'bmm', path: '_bmad/bmm/workflows/2-plan-workflows/prd/workflow.md', phase: 'planejamento' },
    // BMM - Solucionamento
    { name: 'check-implementation-readiness', description: 'Validação crítica de PRD, Arquitetura e Épicos', module: 'bmm', path: '_bmad/bmm/workflows/3-solutioning/check-implementation-readiness/workflow.md', phase: 'solucionamento' },
    { name: 'create-architecture', description: 'Facilitação colaborativa de decisões arquiteturais', module: 'bmm', path: '_bmad/bmm/workflows/3-solutioning/create-architecture/workflow.md', phase: 'solucionamento' },
    { name: 'create-epics-and-stories', description: 'Transformar PRD e Arquitetura em épicos e histórias', module: 'bmm', path: '_bmad/bmm/workflows/3-solutioning/create-epics-and-stories/workflow.md', phase: 'solucionamento' },
    // BMM - Implementação
    { name: 'code-review', description: 'Code review adversário que encontra 3-10 problemas específicos', module: 'bmm', path: '_bmad/bmm/workflows/4-implementation/code-review/workflow.yaml', phase: 'implementação' },
    { name: 'correct-course', description: 'Navegar mudanças significativas durante o sprint', module: 'bmm', path: '_bmad/bmm/workflows/4-implementation/correct-course/workflow.yaml', phase: 'implementação' },
    { name: 'create-story', description: 'Criar próxima user story a partir de épicos', module: 'bmm', path: '_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml', phase: 'implementação' },
    { name: 'dev-story', description: 'Executar story implementando tarefas e testes', module: 'bmm', path: '_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml', phase: 'implementação' },
    { name: 'retrospective', description: 'Retrospectiva após conclusão de épico', module: 'bmm', path: '_bmad/bmm/workflows/4-implementation/retrospective/workflow.yaml', phase: 'implementação' },
    { name: 'sprint-planning', description: 'Gerar e gerenciar arquivo de status do sprint', module: 'bmm', path: '_bmad/bmm/workflows/4-implementation/sprint-planning/workflow.yaml', phase: 'implementação' },
    { name: 'sprint-status', description: 'Resumir sprint-status e surfaçar riscos', module: 'bmm', path: '_bmad/bmm/workflows/4-implementation/sprint-status/workflow.yaml', phase: 'implementação' },
    // BMM - Quick Flow
    { name: 'quick-dev', description: 'Desenvolvimento flexível - tech-specs ou instruções diretas', module: 'bmm', path: '_bmad/bmm/workflows/bmad-quick-flow/quick-dev/workflow.md', phase: 'quick-flow' },
    { name: 'quick-spec', description: 'Engenharia de spec conversacional', module: 'bmm', path: '_bmad/bmm/workflows/bmad-quick-flow/quick-spec/workflow.md', phase: 'quick-flow' },
    // BMM - Outros
    { name: 'document-project', description: 'Analisar e documentar projetos brownfield', module: 'bmm', path: '_bmad/bmm/workflows/document-project/workflow.yaml', phase: 'documentação' },
    { name: 'generate-project-context', description: 'Criar project-context.md com regras e padrões críticos', module: 'bmm', path: '_bmad/bmm/workflows/generate-project-context/workflow.md', phase: 'documentação' },
    // BMM - Diagramas
    { name: 'create-excalidraw-dataflow', description: 'Criar diagramas de fluxo de dados em Excalidraw', module: 'bmm', path: '_bmad/bmm/workflows/excalidraw-diagrams/create-dataflow/workflow.yaml', phase: 'diagramas' },
    { name: 'create-excalidraw-diagram', description: 'Criar diagramas de arquitetura, ERDs, UML', module: 'bmm', path: '_bmad/bmm/workflows/excalidraw-diagrams/create-diagram/workflow.yaml', phase: 'diagramas' },
    { name: 'create-excalidraw-flowchart', description: 'Criar fluxogramas de processos e pipelines', module: 'bmm', path: '_bmad/bmm/workflows/excalidraw-diagrams/create-flowchart/workflow.yaml', phase: 'diagramas' },
    { name: 'create-excalidraw-wireframe', description: 'Criar wireframes de sites e apps', module: 'bmm', path: '_bmad/bmm/workflows/excalidraw-diagrams/create-wireframe/workflow.yaml', phase: 'diagramas' },
    // BMM - TestArch
    { name: 'testarch-atdd', description: 'Gerar testes de aceitação antes da implementação', module: 'bmm', path: '_bmad/bmm/workflows/testarch/atdd/workflow.yaml', phase: 'testes' },
    { name: 'testarch-automate', description: 'Expandir cobertura de automação de testes', module: 'bmm', path: '_bmad/bmm/workflows/testarch/automate/workflow.yaml', phase: 'testes' },
    { name: 'testarch-ci', description: 'Scaffold de pipeline CI/CD com qualidade', module: 'bmm', path: '_bmad/bmm/workflows/testarch/ci/workflow.yaml', phase: 'testes' },
    { name: 'testarch-framework', description: 'Inicializar framework de testes (Playwright ou Cypress)', module: 'bmm', path: '_bmad/bmm/workflows/testarch/framework/workflow.yaml', phase: 'testes' },
    { name: 'testarch-nfr', description: 'Avaliar requisitos não-funcionais antes do release', module: 'bmm', path: '_bmad/bmm/workflows/testarch/nfr-assess/workflow.yaml', phase: 'testes' },
    { name: 'testarch-test-design', description: 'Revisão de testabilidade ou planejamento de testes', module: 'bmm', path: '_bmad/bmm/workflows/testarch/test-design/workflow.yaml', phase: 'testes' },
    { name: 'testarch-test-review', description: 'Revisar qualidade de testes', module: 'bmm', path: '_bmad/bmm/workflows/testarch/test-review/workflow.yaml', phase: 'testes' },
    { name: 'testarch-trace', description: 'Matriz de rastreabilidade requisitos-testes', module: 'bmm', path: '_bmad/bmm/workflows/testarch/trace/workflow.yaml', phase: 'testes' },
    // CIS
    { name: 'design-thinking', description: 'Guiar processos de design centrado no ser humano', module: 'cis', path: '_bmad/cis/workflows/design-thinking/workflow.yaml', phase: 'criativo' },
    { name: 'innovation-strategy', description: 'Identificar oportunidades de disrupção e inovação de modelo de negócio', module: 'cis', path: '_bmad/cis/workflows/innovation-strategy/workflow.yaml', phase: 'criativo' },
    { name: 'problem-solving', description: 'Aplicar metodologias sistemáticas para resolver desafios complexos', module: 'cis', path: '_bmad/cis/workflows/problem-solving/workflow.yaml', phase: 'criativo' },
    { name: 'storytelling', description: 'Criar narrativas convincentes usando frameworks de narrativa', module: 'cis', path: '_bmad/cis/workflows/storytelling/workflow.yaml', phase: 'criativo' },
];

export const WORKFLOW_PHASES = ['análise', 'planejamento', 'solucionamento', 'implementação', 'quick-flow', 'documentação', 'diagramas', 'testes', 'criativo', 'construção', 'ideação', 'colaboração'];
