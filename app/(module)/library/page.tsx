import { WholeLoading } from "@/components/common/loading";
import React, { lazy, Suspense } from "react";
const ChapterList = lazy(
  () => import("@/components/library/chapter/chapter-list")
);

function page() {
  return (
    <Suspense fallback={<WholeLoading />}>
      <ChapterList />
    </Suspense>
  );
}

export default page;
