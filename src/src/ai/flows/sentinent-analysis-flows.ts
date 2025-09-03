
'use server';
/**
 * @fileOverview An AI flow for analyzing community sentiment.
 *
 * - analyzeSentiment - A function that analyzes the sentiment of recent messages.
 * - SentimentAnalysisOutput - The return type for the analyzeSentiment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SentimentAnalysisOutputSchema = z.object({
  positive: z.number().describe('The percentage of positive messages, from 0 to 100.'),
  neutral: z.number().describe('The percentage of neutral messages, from 0 to 100.'),
  negative: z.number().describe('The percentage of negative messages, from 0 to 100.'),
  summary: z.string().describe('A brief summary of the overall community sentiment and any notable trends.'),
});
export type SentimentAnalysisOutput = z.infer<typeof SentimentAnalysisOutputSchema>;

// This is a mock function to simulate fetching recent messages.
// In a real application, this would fetch data from your database.
const getRecentMessages = async () => {
    return [
        "I love the new update, it's so fast!",
        "The UI is a bit confusing, can you fix it?",
        "This app is okay, I guess.",
        "Best chat app ever! So easy to use.",
        "I'm having trouble sending images.",
        "The new theme is amazing, great work!",
        "It's working.",
        "Why was I banned? This is unfair!",
        "The performance on my device is excellent.",
        "Could you add a feature to schedule messages?"
    ];
}


const sentimentPrompt = ai.definePrompt({
  name: 'sentimentPrompt',
  input: { schema: z.object({ messages: z.array(z.string()) }) },
  output: { schema: SentimentAnalysisOutputSchema },
  prompt: `You are a sentiment analysis expert. Analyze the following list of recent user messages from a chat application.

Based on the messages, calculate the percentage of positive, neutral, and negative comments. The total should add up to 100.

Also, provide a concise, one-sentence summary of the overall community sentiment.

Messages:
{{#each messages}}
- {{{this}}}
{{/each}}
`,
});

const sentimentAnalysisFlow = ai.defineFlow(
  {
    name: 'sentimentAnalysisFlow',
    inputSchema: z.void(),
    outputSchema: SentimentAnalysisOutputSchema,
  },
  async () => {
    const messages = await getRecentMessages();
    const { output } = await sentimentPrompt({ messages });
    
    // Ensure percentages add up to 100, adjusting the largest value if necessary
    if (output) {
        const total = output.positive + output.neutral + output.negative;
        if (total !== 100) {
            const diff = 100 - total;
            const maxVal = Math.max(output.positive, output.neutral, output.negative);
            if (maxVal === output.positive) output.positive += diff;
            else if (maxVal === output.neutral) output.neutral += diff;
            else output.negative += diff;
        }
    }

    return output!;
  }
);


export async function analyzeSentiment(): Promise<SentimentAnalysisOutput> {
  return sentimentAnalysisFlow();
}

