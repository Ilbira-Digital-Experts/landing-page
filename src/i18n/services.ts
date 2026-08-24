export const SERVICES = ['auditoria-agentops', 'implementacion-de-agentes', 'agentops-gestionado'] as const;
export type Service = (typeof SERVICES)[number];
