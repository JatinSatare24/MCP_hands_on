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

/**
 * - Use URI: weather://cities
 * - Return a plain text list of supported cities (e.g., London and New York)
 * - Set content type to 'text/plain'
 */

// Registering a static resource on the MCP server
server.resource(
  // 1. Name: A unique string name for this resource registration
  "weather-cities",

  // 2. URI: The unique protocol identifier
  "weather://cities",

  // 3. Metadata Object
  {
    description: "List of supported cities",
    mimeType: "text/plain"
  },

  // 4. Read Callback: Receives the resolved URI object
  async (uri) => {
    return {
      contents: [
        {
          uri: uri.href, // Use the href property from the passed URI object
          mimeType: "text/plain",
          text: `Supported Cities:
- London (UK)
- New York (USA)`
        }
      ]
    };
  }
);

// Inside the async function:
// 1. Define the stdio transport by creating a `const transport` object with a new instance of `StdioServerTransport`.
// 2. Connect the server using `await server.connect(transport)`.
// 3. Print status messages to the terminal using `console.error()` to indicate the server is running.


async function init() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🌤️  Weather MCP Server Started!');
  console.error('🛠️  Tool: getWeatherDataByCityName');
  console.error('📚 Resource: weather://cities');
  console.error('🏙️  Supported Cities: New York, London');
  console.error('✅ Server ready!');

}

init().catch(console.error);
