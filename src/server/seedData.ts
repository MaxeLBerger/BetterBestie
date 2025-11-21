import { challengeModel } from './models/Challenge';
import { dayTaskModel } from './models/DayTask';

export const seedData = () => {
  // Create the GlowUp Challenge
  const glowUpChallenge = challengeModel.create({
    name: '30-Day GlowUp Challenge',
    description: 'Transform your wellness routine with daily habits focused on hydration, exercise, mindfulness, nutrition, and sleep.',
    durationDays: 30,
    category: 'wellness',
  });

  // Seed tasks for all 30 days
  // Days 1-10: Foundation building
  for (let day = 1; day <= 10; day++) {
    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Hydrate',
      description: 'Drink 8 glasses of water throughout the day',
      category: 'Hydration',
      icon: '💧',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Move Your Body',
      description: '20 minutes of physical activity - walk, dance, or stretch',
      category: 'Exercise',
      icon: '🏃',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Mindful Moment',
      description: '5 minutes of meditation or deep breathing',
      category: 'Meditation',
      icon: '🧘',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Nourish',
      description: 'Eat one colorful, whole-food meal',
      category: 'Nutrition',
      icon: '🥗',
    });
  }

  // Days 11-20: Building momentum
  for (let day = 11; day <= 20; day++) {
    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Hydrate Plus',
      description: 'Drink 8 glasses of water + herbal tea',
      category: 'Hydration',
      icon: '💧',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Active Challenge',
      description: '30 minutes of exercise - increase intensity',
      category: 'Exercise',
      icon: '🏃',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Learn Something New',
      description: 'Read, watch, or listen to educational content for 15 minutes',
      category: 'Learning',
      icon: '📚',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Meditation Practice',
      description: '10 minutes of mindfulness or gratitude journaling',
      category: 'Meditation',
      icon: '🧘',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Healthy Eating',
      description: 'Prepare a nutritious meal from scratch',
      category: 'Nutrition',
      icon: '🥗',
    });
  }

  // Days 21-30: Mastery and consistency
  for (let day = 21; day <= 30; day++) {
    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Hydration Master',
      description: 'Maintain optimal hydration all day',
      category: 'Hydration',
      icon: '💧',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Fitness Routine',
      description: '30+ minutes of your favorite exercise',
      category: 'Exercise',
      icon: '🏃',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Growth Mindset',
      description: '20 minutes learning something that interests you',
      category: 'Learning',
      icon: '📚',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Deep Meditation',
      description: '15 minutes of mindfulness practice',
      category: 'Meditation',
      icon: '🧘',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Nutrition Excellence',
      description: 'Focus on whole foods and balanced meals all day',
      category: 'Nutrition',
      icon: '🥗',
    });

    dayTaskModel.create({
      challengeId: glowUpChallenge.id,
      dayNumber: day,
      title: 'Rest & Recovery',
      description: 'Get 7-8 hours of quality sleep',
      category: 'Sleep',
      icon: '😴',
    });
  }

  console.log('✅ Seed data created successfully!');
  console.log(`   Challenge: ${glowUpChallenge.name}`);
  console.log(`   Total tasks: ${dayTaskModel.getAll().length}`);
  
  return glowUpChallenge.id;
};
