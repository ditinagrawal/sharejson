"use client";

import { json } from "@codemirror/lang-json";
import { JsonData } from "@prisma/client";
import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";

interface JSONPageProps {
  params: {
    id: string;
  };
}

const JSONPage = ({ params }: JSONPageProps) => {
  const { id } = params;
  const [jsonData, setJsonData] = useState<JsonData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/json/${id}`);
        const data = await response.json();
        setJsonData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="mt-8">Loading...</div>;
  }

  return (
    <div className="mt-8 space-y-4">
      <h1 className="text-2xl underline font-bold">{jsonData?.name}</h1>
      <ReactCodeMirror
        value={jsonData?.content || ""}
        height="400px"
        extensions={[json()]}
        editable={false}
        className="border shadow-sm"
      />
    </div>
  );
};

export default JSONPage;
