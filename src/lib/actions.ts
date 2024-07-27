"use server";

import { db } from "@/db";
import { userMessage, botMessage } from "./data";
import { nanoid } from "./utils";

export async function saveMessages() {
  const chatId = "U1g04j3";

  const messages = [userMessage, botMessage].map((m) => {
    return {
      id: nanoid(),
      chatId: chatId,
      runId: m.runId || "",
      msgId: m.msgId || "",
      role: m.role,
      content: m.content,
      createAt: m.createdAt ? new Date(m.createdAt * 1000) : new Date(),
      updatedAt: new Date(),
    };
  });

  try {
    let chat = await db.chat.findUnique({ where: { id: chatId } });
    if (!chat) {
      await db.chat.create({
        data: {
          id: chatId,
          userId: "1",
          assistantId: "A001",
          title: "",
          path: "",
          threadId: "1231231",
        },
      });
    }

    console.log("start");
    await db.chatMessage.createMany({
      data: messages,
    });
    return "success";
  } catch (e) {
    console.error(e);
    return "failed";
  }
}
