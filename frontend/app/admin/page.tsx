import { Suspense } from "react";
import CompletionCards from "@/app/components/CompletionCards"

const AdminPage = () => {
  return (
    <main className="max-w-7xl mx-auto mt-30 mb-20">
      <Suspense fallback={<div>Loading...</div>}>
        <CompletionCards />
      </Suspense>
    </main>
  );
}

export default AdminPage