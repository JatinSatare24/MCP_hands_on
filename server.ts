import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";

// Create MCP server instance
const server = new McpServer({
  name: 'Weather Data Fetcher',
  version: '1.0.0'

});


// A helper function to simulate fetching weather data
async function getWeatherByCity(city: string) {
  if (city.toLowerCase() === 'new york') {
    return { temp: '22°C', forecast: 'Partly cloudy with a breeze' };
  }
  if (city.toLowerCase() === 'london') {
    return { temp: '16°C', forecast: 'Rainy and overcast' };
  }
  return { temp: null, error: 'Weather data not available for this city' };
}

// 🧠 Challenge:  
// Create a tool called `getWeatherDataByCityName`  
// It should take a city (New York or London) and return mock weather data as JSON text  
// Use a helper like getWeatherByCity() to return the data  

// Registering a tool on the MCP server
server.tool(
  // Tool name
  'getWeatherDataByCityName',
  // Tool description
  'Get weather data for New York or London',
  //  Define the input schema using Zod
  {
    city: z.string().describe('Name of the city to get weather for')
  },
  // Define the async function that will run when the tool is called
  async ({ city }) => {
    const weatherData = await getWeatherByCity(city);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(weatherData)
        }
      ]
    };
  }
);

