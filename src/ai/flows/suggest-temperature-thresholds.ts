// src/ai/flows/suggest-temperature-thresholds.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal temperature thresholds
 * for solar panel cooling pump activation based on historical solar panel data.
 *
 * - suggestTemperatureThresholds - A function that suggests temperature thresholds for cooling pump activation.
 * - SuggestTemperatureThresholdsInput - The input type for the suggestTemperatureThresholds function.
 * - SuggestTemperatureThresholdsOutput - The return type for the suggestTemperatureThresholds function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTemperatureThresholdsInputSchema = z.object({
  historicalData: z.string().describe('Historical solar panel data in JSON format, including surface temperature, ambient temperature, voltage, current, power, and pump status.'),
});
export type SuggestTemperatureThresholdsInput = z.infer<typeof SuggestTemperatureThresholdsInputSchema>;

const SuggestTemperatureThresholdsOutputSchema = z.object({
  suggestedThreshold: z.number().describe('The suggested optimal temperature threshold for activating the cooling pump in Celsius.'),
  reasoning: z.string().describe('The reasoning behind the suggested temperature threshold.'),
});
export type SuggestTemperatureThresholdsOutput = z.infer<typeof SuggestTemperatureThresholdsOutputSchema>;

export async function suggestTemperatureThresholds(input: SuggestTemperatureThresholdsInput): Promise<SuggestTemperatureThresholdsOutput> {
  return suggestTemperatureThresholdsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTemperatureThresholdsPrompt',
  input: {schema: SuggestTemperatureThresholdsInputSchema},
  output: {schema: SuggestTemperatureThresholdsOutputSchema},
  prompt: `You are an expert in solar panel efficiency and cooling systems.

  Analyze the provided historical solar panel data to suggest an optimal temperature threshold for activating the cooling pump. Consider factors such as ambient temperature, surface temperature, power output, and pump activity to determine a threshold that maximizes energy production while preventing overheating.

  Respond with a temperature in Celsius and a detailed explanation of why this threshold is optimal, including the data points and trends you considered.

  Historical Data: {{{historicalData}}}
  `,
});

const suggestTemperatureThresholdsFlow = ai.defineFlow(
  {
    name: 'suggestTemperatureThresholdsFlow',
    inputSchema: SuggestTemperatureThresholdsInputSchema,
    outputSchema: SuggestTemperatureThresholdsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
