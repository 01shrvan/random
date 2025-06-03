interface MemoryEntry {
  timestamp: Date;
  type: 'onboarding' | 'session' | 'insight' | 'goal';
  data: any;
  importance: 'low' | 'medium' | 'high';
}

class MemoryService {
  private userMemories = new Map<string, MemoryEntry[]>();
  private readonly MAX_MEMORIES_PER_USER = 50; // Prevent memory bloat

  storeMemory(userId: string, type: MemoryEntry['type'], data: any, importance: MemoryEntry['importance'] = 'medium') {
    if (!this.userMemories.has(userId)) {
      this.userMemories.set(userId, []);
    }

    const memories = this.userMemories.get(userId)!;
    
    memories.push({
      timestamp: new Date(),
      type,
      data,
      importance
    });

    // Keep only recent important memories
    if (memories.length > this.MAX_MEMORIES_PER_USER) {
      memories.sort((a, b) => {
        if (a.importance !== b.importance) {
          const importanceOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return importanceOrder[b.importance] - importanceOrder[a.importance];
        }
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
      
      this.userMemories.set(userId, memories.slice(0, this.MAX_MEMORIES_PER_USER));
    }
  }

  getRecentMemories(userId: string, limit: number = 10): MemoryEntry[] {
    const memories = this.userMemories.get(userId) || [];
    return memories
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  getMemoriesByType(userId: string, type: MemoryEntry['type']): MemoryEntry[] {
    const memories = this.userMemories.get(userId) || [];
    return memories.filter(memory => memory.type === type);
  }

  getUserContext(userId: string): any {
    const memories = this.userMemories.get(userId) || [];
    
    const context = {
      onboardingData: null,
      recentSessions: [],
      keyInsights: [],
      currentGoals: []
    };

    for (const memory of memories) {
      switch (memory.type) {
        case 'onboarding':
          context.onboardingData = memory.data;
          break;
        case 'session':
          if (context.recentSessions.length < 3) {
            context.recentSessions.push(memory.data);
          }
          break;
        case 'insight':
          if (memory.importance === 'high' && context.keyInsights.length < 5) {
            context.keyInsights.push(memory.data);
          }
          break;
        case 'goal':
          context.currentGoals.push(memory.data);
          break;
      }
    }

    return context;
  }
}

export const memoryService = new MemoryService();