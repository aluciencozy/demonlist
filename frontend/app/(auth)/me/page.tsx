import UserStatus from "@/app/components/UserStatus";
import { Suspense } from "react";

const Me = () => {
  return (
      <div>
        <Suspense fallback={<p>Loading user status...</p>}>
          <UserStatus />
        </Suspense>
      </div>
    );
};

export default Me;
