"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const params = useParams(); // ex: {profile_name: 'foobar'}

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
      <h1 className="text-3xl font-bold">@{params.profile_name}</h1>

      </div>

    </div>
  );
}

