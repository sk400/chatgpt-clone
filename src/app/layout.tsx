import { Layout, Login, Provider } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth/next";
import authOptions from "@/lib/constants";

export const metadata: Metadata = {
  title: "ChatGPT",
  description: "Your creative friend.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(NextAuth(authOptions));

  return (
    <html lang="en">
      <body style={{ backgroundColor: "#343541" }}>
        <Provider>
          {!session ? <Login /> : <Layout>{children}</Layout>}
        </Provider>
      </body>
    </html>
  );
}
