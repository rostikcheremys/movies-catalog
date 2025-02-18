import React from "react";
import Movie from "@/app/movie";

export const metadata = {
  title: "Movies Catalog",
};

export default function Page() {
  return (
      <div>
        <Movie></Movie>
      </div>
  );
}
