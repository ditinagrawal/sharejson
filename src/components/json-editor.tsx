"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddJsonDialog } from "./add-json-dialog";
import { JSONDataTable } from "./json-data-table";
import { useState } from "react";

export const JSONEditor = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleSave = async (jsonName: string, jsonData: string) => {
    const response = await fetch("/api/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: jsonName,
        content: jsonData,
      }),
    });
    if (response.ok) {
      setRefreshKey((prev) => prev + 1);
      console.log("Data saved successfully");
    } else {
      console.error("Failed to save data");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved JSON Data</CardTitle>
        <CardDescription>view and share your json data</CardDescription>
      </CardHeader>
      <CardContent>
        <JSONDataTable key={refreshKey} />
      </CardContent>
      <CardFooter>
        <AddJsonDialog onSave={handleSave} />
      </CardFooter>
    </Card>
  );
};
