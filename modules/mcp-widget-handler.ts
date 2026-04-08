import { environment, ZuploContext, ZuploMcpSdk, ZuploRequest } from "@zuplo/runtime";

/**
 * Shared utility for MCP tool handlers that need to return a widget.
 * Handles calling an upstream API and injecting _meta.ui.resourceUri
 * into the MCP tool response for both Claude (MCP Apps standard) and
 * ChatGPT (OpenAI Apps SDK) compatibility.
 *
 * @param upstreamPath - The Every.org API path, e.g. /v0.2/search/cancer
 * @param queryParams  - Optional query params to forward (take, page, causes, etc.)
 * @param widgetUri    - The MCP resource URI of the widget to render
 * @param request      - The ZuploRequest
 * @param context      - The ZuploContext
 */
export async function mcpWidgetHandler(
  upstreamPath: string,
  queryParams: Record<string, string | undefined>,
  widgetUri: string,
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
      ui: { resourceUri: widgetUri },
    },
  });

  return Response.json(data);
}