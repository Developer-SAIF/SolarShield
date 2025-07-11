'use server';

/**
 * @fileOverview AI-driven anomaly detection flow for solar panel data.
 *
 * - detectAnomalies - Analyzes solar panel data and provides customized tips.
 * - DetectAnomaliesInput - The input type for the detectAnomalies function.
 * - DetectAnomaliesOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomaliesInputSchema = z.object({
  surfaceTemperature: z.number().describe('The surface temperature of the solar panel in degrees Celsius.'),
  ambientTemperature: z.number().describe('The ambient temperature in degrees Celsius.'),
  voltage: z.number().describe('The voltage output of the solar panel.'),
  current: z.number().describe('The current output of the solar panel in Amperes.'),
  power: z.number().describe('The power output of the solar panel in Watts.'),
  timestamp: z.string().describe('The timestamp of the data in ISO format.'),
});
export type DetectAnomaliesInput = z.infer<typeof DetectAnomaliesInputSchema>;

const DetectAnomaliesOutputSchema = z.object({
  isAnomaly: z.boolean().describe('Whether an anomaly is detected in the solar panel data.'),
  anomalyType: z.string().describe('The type of anomaly detected, if any.'),
  customizedTips: z.string().describe('Customized tips to address the anomaly and optimize system performance.'),
});
export type DetectAnomaliesOutput = z.infer<typeof DetectAnomaliesOutputSchema>;

export async function detectAnomalies(input: DetectAnomaliesInput): Promise<DetectAnomaliesOutput> {
  return detectAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnomaliesPrompt',
  input: {schema: DetectAnomaliesInputSchema},
  output: {schema: DetectAnomaliesOutputSchema},
  prompt: `You are an expert in solar panel systems and can detect anomalies in solar panel data.

  Analyze the following solar panel data to detect any anomalies. Provide customized tips to address the issue and optimize system performance.

  Surface Temperature: {{{surfaceTemperature}}}°C
  Ambient Temperature: {{{ambientTemperature}}}°C
  Voltage: {{{voltage}}}V
  Current: {{{current}}}A
  Power: {{{power}}}W
  Timestamp: {{{timestamp}}}

  Consider factors such as temperature differences, voltage and current fluctuations, and power output variations.

  If an anomaly is detected, set isAnomaly to true, provide anomalyType, and suggest customizedTips to resolve the anomaly and improve the system's efficiency and longevity. If no anomaly is found, set isAnomaly to false and leave other fields empty.

  Ensure that your response is concise and actionable.
`,
});

const detectAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectAnomaliesFlow',
    inputSchema: DetectAnomaliesInputSchema,
    outputSchema: DetectAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
