import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import { mcpWidgetHandler } from "./mcp-widget-handler";

const WIDGET_URI = "ui://widget/charity.html";

export default async function handler(
  request: ZuploRequest,
  context: ZuploContext,
) {
  return mcpWidgetHandler(
    `/v0.2/nonprofit/${request.params.identifier}`,
    {},
    WIDGET_URI,
    request,
    context,
  );
}