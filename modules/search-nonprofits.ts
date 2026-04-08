import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import { mcpWidgetHandler } from "./mcp-widget-handler";

const CLAUDE_WIDGET_URI = "ui://widget/charity-claude.html";

export default async function handler(
  request: ZuploRequest,
  context: ZuploContext,
) {
  return mcpWidgetHandler(
    `/v0.2/search/${request.params.searchTerm}`,
    {
      take: request.query.take,
      causes: request.query.causes,
    },
    CLAUDE_WIDGET_URI,
    request,
    context,
  );
}