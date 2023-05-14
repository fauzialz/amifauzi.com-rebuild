import { json } from "@remix-run/node";
import { getClinetEnv } from "~/env.server";
import { getMessage, getPersonRemarks } from "~/utils/googleSheetsApi";
import type { MessageItemType } from "~/utils/googleSheetsApi";
import type { LoaderFunction } from "@remix-run/node";

export interface LoaderDataType {
  remark: string;
  messages: MessageItemType[];
  ENV: ReturnType<typeof getClinetEnv>;
}

export const indexLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const recipient = url.searchParams.get("to") || "";

  const [recipientRemarks, messages] = await Promise.all([
    getPersonRemarks(recipient),
    getMessage(),
  ]);

  return json<LoaderDataType>({
    remark: recipientRemarks?.remarks || recipient,
    messages,
    ENV: getClinetEnv(),
  });
};
