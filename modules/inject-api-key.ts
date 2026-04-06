import { ZuploRequest, ZuploContext, environment } from "@zuplo/runtime";

export default async function (
  request: ZuploRequest,
  context: ZuploContext,
  options: any,
  policyName: string,
) {
  const url = new URL(request.url);
  url.searchParams.set("apiKey", environment.EVERY_ORG_API_KEY);
  return new ZuploRequest(url.toString(), request);
}