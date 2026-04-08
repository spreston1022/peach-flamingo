import { environment, ZuploContext, ZuploMcpSdk, ZuploRequest } from "@zuplo/runtime";

/**
 * Shared utility for MCP tool handlers that need to return a widget.
 * Injects _meta.ui.resourceUri into the MCP tool response for Claude (MCP Apps standard)
 * and structuredContent for ChatGPT (OpenAI Apps SDK).
 */
export async function mcpWidgetHandler(
  upstreamPath: string,
  queryParams: Record<string, string | undefined>,
  claudeWidgetUri: string,
  request: ZuploRequest,
  context: ZuploContext,
): Promise<Response> {
  const sdk = new ZuploMcpSdk(context);

  const apiUrl = new URL(`https://partners.every.org${upstreamPath}`);
  apiUrl.searchParams.set("apiKey", environment.EVERY_ORG_API_KEY ?? "");

  for (const [key, value] of Object.entries(queryParams)) {
    if (value) apiUrl.searchParams.set(key, value);
  }

  const response = await fetch(apiUrl.toString());
  const data = await response.json();

  sdk.setRawCallToolResult({
    content: [{ type: "text", text: JSON.stringify(data) }],
    structuredContent: data,
    _meta: {
      ui: { resourceUri: claudeWidgetUri },
    },
  });

  return Response.json(data);
}