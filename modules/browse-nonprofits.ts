import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import { mcpWidgetHandler } from "./mcp-widget-handler";

const CLAUDE_WIDGET_URI = "ui://widget/charity-claude.html";

export default async function handler(
  request: ZuploRequest,
  context: ZuploContext,
) {
  return mcpWidgetHandler(
    `/v0.2/browse/${request.params.cause}`,
    {
      take: request.query.take,
      page: request.query.page,
    },
    CLAUDE_WIDGET_URI,
    request,
    context,
  );
}