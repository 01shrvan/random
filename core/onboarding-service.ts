import type { OnboardingData, LifeState, UserProfile } from "@/utils/types";

class OnboardingService {
  private onboardingQuestions = {
    initial: [
      "What would you like me to call you?",
      "What brings you here today? What's been on your mind lately?",
      "How would you describe your current emotional state?",
    ],
    lifeAssessment: [
      "What are the main challenges you're facing right now?",
      "On a scale of 1-10, how would you rate your current stress level?",
      "What does your support system look like? (friends, family, etc.)",
      "What are your main priorities in life right now?",
    ],
    goals: [
      "What would you like to work on together?",
      "What does success look like for you in therapy?",
      "Are there specific coping strategies you'd like to learn?",
    ]
  };

  async processOnboarding(
    responses: Record<string, string>, 
    userId: string
  ): Promise<OnboardingData> {
    
    const lifeState: LifeState = {
      currentChallenges: this.extractChallenges(responses.challenges || ''),
      emotionalState: this.assessEmotionalState(responses.emotion || ''),
      stressLevel: parseInt(responses.stress) || 5,
      supportSystem: this.assessSupportSystem(responses.support || ''),
      priorities: this.extractPriorities(responses.priorities || ''),
      goals: this.extractGoals(responses.goals || '')
    };

    return {
      personalInfo: {
        name: responses.name,
        age: responses.age ? parseInt(responses.age) : undefined,
      },
      lifeState,
      therapeuticGoals: this.extractGoals(responses.therapeuticGoals || ''),
      preferredApproach: this.determineApproach(responses)
    };
  }

  private extractChallenges(text: string): string[] {
    // Smart extraction using common challenge keywords
    const challengeKeywords = [
      'anxiety', 'depression', 'stress', 'relationship', 'work', 'family',
      'money', 'health', 'loneliness', 'grief', 'trauma', 'addiction'
    ];
    
    return challengeKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );
  }

  private assessEmotionalState(emotion: string): LifeState['emotionalState'] {
    const lowerEmotion = emotion.toLowerCase();
    
    if (lowerEmotion.includes('terrible') || lowerEmotion.includes('awful')) {
      return 'very_low';
    } else if (lowerEmotion.includes('bad') || lowerEmotion.includes('sad')) {
      return 'low';
    } else if (lowerEmotion.includes('okay') || lowerEmotion.includes('fine')) {
      return 'neutral';
    } else if (lowerEmotion.includes('good') || lowerEmotion.includes('happy')) {
      return 'good';
    } else {
      return 'neutral';
    }
  }

  private assessSupportSystem(support: string): LifeState['supportSystem'] {
    const lowerSupport = support.toLowerCase();
    
    if (lowerSupport.includes('no one') || lowerSupport.includes('alone')) {
      return 'none';
    } else if (lowerSupport.includes('few') || lowerSupport.includes('limited')) {
      return 'limited';
    } else if (lowerSupport.includes('some') || lowerSupport.includes('moderate')) {
      return 'moderate';
    } else {
      return 'strong';
    }
  }

  private extractPriorities(text: string): string[] {
    // Extract key priorities from text
    const priorityKeywords = [
      'career', 'family', 'health', 'relationships', 'education', 
      'finances', 'personal growth', 'creativity', 'travel'
    ];
    
    return priorityKeywords.filter(priority => 
      text.toLowerCase().includes(priority)
    );
  }

  private extractGoals(text: string): string[] {
    // Extract therapeutic goals
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.slice(0, 3); // Top 3 goals
  }

  private determineApproach(responses: Record<string, string>): OnboardingData['preferredApproach'] {
    const allText = Object.values(responses).join(' ').toLowerCase();
    
    if (allText.includes('think') || allText.includes('thought')) {
      return 'cognitive';
    } else if (allText.includes('mindful') || allText.includes('meditation')) {
      return 'mindfulness';
    } else if (allText.includes('solution') || allText.includes('practical')) {
      return 'solution_focused';
    } else {
      return 'mixed';
    }
  }
}

export const onboardingService = new OnboardingService();