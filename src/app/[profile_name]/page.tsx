"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function ProfilePage() {
  const params = useParams(); // { profile_name: "foobar" }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 py-10">

      {/* Avatar */}
      <Avatar className="glow-border w-28 h-28 mt-16">
        <AvatarImage src=""/>
        <AvatarFallback className="text-xl">
          {params.profile_name?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Name + Bio */}
      <h1 className="text-2xl font-bold mt-8">@{params.profile_name}</h1>
      <p className="text-muted-foreground text-center mb-6 w-full max-w-lg">
        Put bio here. Clean mobile-first layout Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, .
      </p>

      {/* Links */}
      <div className="w-full max-w-sm flex flex-col gap-3 mt-8">
        <Card className="rounded-xl hover:bg-accent transition cursor-pointer">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-center px-4 py-6 text-base font-medium"
            >
              Link One
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl hover:bg-accent transition cursor-pointer">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-center px-4 py-6 text-base font-medium"
            >
              Link Two
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl hover:bg-accent transition cursor-pointer">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-center px-4 py-6 text-base font-medium"
            >
              Link Three
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <p className="mt-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} LinkVault
      </p>
    </div>
  );
}
