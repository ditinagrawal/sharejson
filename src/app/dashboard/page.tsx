import { JSONEditor } from "@/components/json-editor";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) return redirect("/");
  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });
  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name: user.fullName,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }
  return (
    <div>
      <div className="my-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-muted-foreground">
          manage your data and share it with others.
        </div>
      </div>
      <JSONEditor />
    </div>
  );
};

export default DashboardPage;
