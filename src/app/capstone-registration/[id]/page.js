"use client";

import * as React from "react";
import Registration from "@/components/registration/registration";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <Registration id={id} />;
}
