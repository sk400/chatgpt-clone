import query from "@/lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../../../firebaseAdmin";

export const POST = async (request: Request) => {
  try {
    const { prompt, chatId, model, session } = await request.json();

    if (!prompt) {
      return new Response("Please provide the prompt", { status: 400 });
    }

    if (!chatId) {
      return new Response("Please provide a valid chatId", { status: 400 });
    }

    if (!session) {
      return new Response(
        "Please authenticate first to interact with ChatGPT",
        {
          status: 400,
        }
      );
    }

    const email = session?.user?.email;
    if (!email) {
      return new Response(
        "Please authenticate first to interact with ChatGPT",
        { status: 400 }
      );
    }

    const response = await query(model, prompt);

    if (response === null) {
      return new Response("No answer found", { status: 400 });
    }

    const message: Message = {
      text: response || "ChatGPT was unable to find an answer for that!",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar: "https://links.papareact.com/89k",
      },
    };

    if (message.text === null) {
      return new Response("No answer found", { status: 400 });
    }

    await adminDb
      .collection("users")
      .doc(email)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    const answer = {
      answer: message.text,
    };

    return new Response(JSON.stringify(answer), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 500 });
  }
};
