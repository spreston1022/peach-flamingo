import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function handler(
  request: ZuploRequest,
  context: ZuploContext,
) {
  const response = await fetch("https://project-ox76b.vercel.app/charity-claude.html");
  const html = await response.text();

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html;profile=mcp-app",
    },
  });
}