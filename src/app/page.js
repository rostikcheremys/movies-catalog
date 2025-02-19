import React from "react";
import Movie from "@/app/components/movie";
import Card from "@/app/components/Card";
import Pagination from "@/app/components/Pagination";

export const metadata = {
  title: "Name",
};

export default function Page() {
  return (
      <div className="custom-mt-card">

          <Card/>
      </div>
  );
}
