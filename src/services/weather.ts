'use server';

export type WeatherData = {
  temperature: number;
};

/**
 * Fetches the current weather for a given latitude and longitude.
 * For this example, we'll use a fixed location (Phoenix, AZ).
 * @returns {Promise<WeatherData>} The current weather data.
 */
export async function getCurrentWeather(): Promise<WeatherData> {
  try {
    const lat = 33.45;
    const lon = -112.07;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&temperature_unit=celsius`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data.');
    }

    const data = await response.json();

    return {
      temperature: data.current.temperature_2m,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Return a default/fallback value in case of an error
    return {
      temperature: 25,
    };
  }
}
