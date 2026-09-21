import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";

// Create MCP server instance
const server = new McpServer({
  name: 'Weather Data Fetcher',
  version: '1.0.0'

});



