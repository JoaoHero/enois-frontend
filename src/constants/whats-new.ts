import type { WhatsNewItem } from "@rede-enois/design-system/domain";

/**
 * The current "what's new" release. To announce a new one, replace the items AND change the id:
 * the popup opens once for everyone whose last seen id differs. Only curated releases go here,
 * never every deploy.
 */
export const WHATS_NEW: { id: string; items: WhatsNewItem[] } = {
  id: "2026-11-01",
  items: [
    {
      id: "study-pairs",
      title: "Par de estudo",
      description: "Encontre alguém com os mesmos objetivos para estudar junto.",
    },
    {
      id: "local-communities",
      title: "Comunidades da sua cidade",
      description: "Descubra e participe das comunidades de quem mora perto de você.",
    },
    {
      id: "streak-rest",
      title: "Descanso na sequência",
      description: "Faltou um dia? O descanso da semana cobre sozinho e a sequência continua.",
    },
    {
      id: "accepted-answer",
      title: "Resposta aceita nas dúvidas",
      description: "Quem perguntou pode marcar a resposta que resolveu a dúvida.",
    },
    {
      id: "recurring-events",
      title: "Eventos recorrentes",
      description: "Crie um evento que se repete sem cadastrar cada data de novo.",
    },
    {
      id: "notification-preferences",
      title: "Resumo semanal e notificações",
      description:
        "Escolha o que chega até você fora do app, incluindo um resumo da semana por e-mail.",
    },
  ],
};
