"use client";

import * as React from "react";
import Registration from "@/components/registration/registration";
import { useParams, useSearchParams } from "next/navigation";

export default function Page() {
  const orgId = useParams().id;
  const queryId = useSearchParams().get("id");

  return <Registration orgId={orgId} signupId={queryId} />;
}
