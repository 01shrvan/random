import type { TherapyOutput, TherapySession, LifeState } from "@/utils/types";

class TherapyService {
  private therapeuticInterventions = {
    cognitive: {
      techniques: ['thought challenging', 'cognitive restructuring', 'behavioral experiments'],
      exercises: [
        'Write down 3 negative thoughts and challenge them with evidence',
        'Practice the 5-4-3-2-1 grounding technique when anxious',
        'Keep a thought diary for one week'
      ]
    },
    mindfulness: {
      techniques: ['meditation', 'body scan', 'mindful breathing'],
      exercises: [
        'Practice 10 minutes of daily meditation',
        'Do a body scan before sleep',
        'Try mindful eating with one meal today'
      ]
    },
    solution_focused: {
      techniques: ['goal setting', 'scaling questions', 'miracle question'],
      exercises: [
        'Set 3 small, achievable goals for this week',
        'Rate your progress on current goals (1-10)',
        'Visualize your ideal day and identify 2 actionable steps'
      ]
    }
  };

  async provideTherapy(
    userInput: string,
    lifeState: LifeState,
    approach: string = 'mixed'
  ): Promise<TherapyOutput> {
    
    const mood = this.assessCurrentMood(userInput);
    const topics = this.identifyTopics(userInput);
    const insights = this.generateInsights(userInput, lifeState);
    const recommendations = this.generateRecommendations(lifeState, approach);
    const exercises = this.selectExercises(approach, topics);
    
    return {
      sessionSummary: `Explored themes of ${topics.join(', ')}. Current mood: ${mood}`,
      insights,
      recommendations,
      exercises,
      followUpQuestions: this.generateFollowUpQuestions(topics),
      moodAssessment: mood
    };
  }

  private assessCurrentMood(input: string): string {
    const moodKeywords = {
      anxious: ['anxious', 'worried', 'nervous', 'stressed'],
      sad: ['sad', 'depressed', 'down', 'low'],
      angry: ['angry', 'frustrated', 'irritated', 'mad'],
      hopeful: ['hopeful', 'optimistic', 'positive', 'good'],
      confused: ['confused', 'uncertain', 'lost', 'unclear']
    };

    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        return mood;
      }
    }
    return 'neutral';
  }

  private identifyTopics(input: string): string[] {
    const topicKeywords = {
      'relationships': ['relationship', 'partner', 'friend', 'family'],
      'work/career': ['work', 'job', 'career', 'boss', 'colleague'],
      'self-esteem': ['confidence', 'self-worth', 'insecure', 'doubt'],
      'anxiety': ['anxiety', 'panic', 'worry', 'fear'],
      'depression': ['depression', 'hopeless', 'empty', 'meaningless']
    };

    const identifiedTopics = [];
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        identifiedTopics.push(topic);
      }
    }
    return identifiedTopics;
  }

  private generateInsights(input: string, lifeState: LifeState): string[] {
    const insights = [];
    
    if (lifeState.stressLevel > 7) {
      insights.push("Your high stress level may be impacting your ability to see situations clearly");
    }
    
    if (lifeState.supportSystem === 'none' || lifeState.supportSystem === 'limited') {
      insights.push("Building connections with others could provide valuable emotional support");
    }
    
    if (input.toLowerCase().includes('always') || input.toLowerCase().includes('never')) {
      insights.push("Notice the absolute language you're using - reality often exists in shades of gray");
    }
    
    return insights;
  }

  private generateRecommendations(lifeState: LifeState, approach: string): string[] {
    const recommendations = [];
    
    if (lifeState.emotionalState === 'very_low' || lifeState.emotionalState === 'low') {
      recommendations.push("Consider reaching out to a mental health professional for additional support");
      recommendations.push("Focus on basic self-care: sleep, nutrition, and gentle movement");
    }
    
    if (lifeState.stressLevel > 6) {
      recommendations.push("Implement daily stress-reduction techniques like deep breathing or short walks");
    }
    
    return recommendations;
  }

  private selectExercises(approach: string, topics: string[]): string[] {
    const intervention = this.therapeuticInterventions[approach as keyof typeof this.therapeuticInterventions] 
                       || this.therapeuticInterventions.cognitive;
    
    return intervention.exercises.slice(0, 2); // Return 2 relevant exercises
  }

  private generateFollowUpQuestions(topics: string[]): string[] {
    const questionBank = {
      'relationships': [
        "How did that conversation make you feel?",
        "What would you like to be different in this relationship?"
      ],
      'work/career': [
        "What aspects of work bring you satisfaction?",
        "How does work stress affect other areas of your life?"
      ],
      'anxiety': [
        "What physical sensations do you notice when anxious?",
        "What helps you feel more grounded?"
      ]
    };

    const questions = [];
    for (const topic of topics) {
      if (questionBank[topic as keyof typeof questionBank]) {
        questions.push(...questionBank[topic as keyof typeof questionBank]);
      }
    }
    
    return questions.slice(0, 2);
  }
}

export const therapyService = new TherapyService();