// Funções puras dos avisos (sem React e sem rede), fáceis de testar.

export const MAX_TITLE = 80;

// Junta listas de avisos sem repetir (o mesmo aviso pode chegar pelo histórico
// e pelo tempo real) e deixa o mais novo primeiro.
export function mergeNotifications(current, incoming, limit = 50) {
  const byId = new Map();
  [...incoming, ...current].forEach((item) => {
    if (!byId.has(item.id)) byId.set(item.id, item);
  });

  return [...byId.values()]
    .sort((a, b) => {
      const diff = new Date(b.created_at) - new Date(a.created_at);
      return diff || Number(b.id) - Number(a.id) || 0;
    })
    .slice(0, limit);
}

// Devolve a mensagem de erro, ou null se estiver tudo certo.
export function validateNotification(title, body) {
  if (!title.trim() || !body.trim()) return "Preencha o título e a mensagem.";
  if (title.trim().length > MAX_TITLE) {
    return `O título pode ter no máximo ${MAX_TITLE} caracteres.`;
  }
  return null;
}

// "15/11 16:40" (feito à mão para não depender de Intl no Android).
export function formatDateTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (value) => String(value).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}
