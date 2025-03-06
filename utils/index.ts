import { Conversation } from "@/types";

export const groupConversations = (conversations: Conversation[]) => {
  // Helper function to format date difference
  const formatDate = (dateString: string): string => {
    const today = new Date();
    const date = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString();
  };

  // Group conversations by date
  type GroupedConversations = {
    [key: string]: Conversation[];
  };

  const sortedConversations = conversations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const groupedConversations = sortedConversations
    .filter((item) => !!item.createdAt)
    .reduce<GroupedConversations>((acc, conversation) => {
      const dateKey = formatDate(conversation.createdAt);
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(conversation);
      return acc;
    }, {});

  const formattedGroupedConversations = Object.keys(groupedConversations).map(
    (dateKey) => ({
      date: dateKey,
      conversations: groupedConversations[dateKey],
    })
  );

  return formattedGroupedConversations;
};

export const updateConversation = (
  updatedConversation: Conversation,
  allConversations: Conversation[]
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.uuid === updatedConversation.uuid) {
      return updatedConversation;
    }

    return c;
  });

  saveConversation(updatedConversation);
  saveConversations(updatedConversations);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const saveConversation = (conversation: Conversation) => {
  localStorage.setItem("selectedConversation", JSON.stringify(conversation));
};

export const saveConversations = (conversations: Conversation[]) => {
  localStorage.setItem("conversationHistory", JSON.stringify(conversations));
};

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return ((...args) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  }) as T;
}
