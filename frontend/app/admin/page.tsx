import { Suspense } from "react";
import CompletionCards from "@/app/components/CompletionCards"

const AdminPage = () => {
  return (
    <main className="max-w-7xl mx-auto mt-30 mb-20">
      <div className="mb-15 space-y-4">
        <h1 className="font-bold text-7xl font-figtree text-main text-shadow-xs text-shadow-main">
          Verify Pending Completions
        </h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CompletionCards />
      </Suspense>
    </main>
  );
}

export default AdminPage