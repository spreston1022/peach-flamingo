import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

// Outbound policy for Claude widget route (/widget/claude)
// Claude requires text/html;profile=mcp-app (MCP Apps open standard)
export default async function (
  response: Response,
  request: ZuploRequest,
  context: ZuploContext,
) {
  const newResponse = new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
  newResponse.headers.set("Content-Type", "text/html");
  return newResponse;
}