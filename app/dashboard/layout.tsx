import { Sidebar } from "./components/sidebar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
const { database } = require("@/lib/db-wrapper");

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Track user in database when they access the dashboard
  if (session?.user?.email) {
    try {
      await database.users.upsert({
        email: session.user.email,
        name: session.user.name || undefined,
        image: session.user.image || undefined,
      });
    } catch (error) {
      console.error("Error tracking user:", error);
    }
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen">
        <Sidebar session={session} />
        <main className="w-full flex-1 lg:ml-0">{children}</main>
      </div>
    </SessionProvider>
  );
}
