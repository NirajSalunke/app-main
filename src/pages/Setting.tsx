import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router";

const Setting = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-screen h-screen gap-10 justify-center items-center bg-black text-white">
      <h2 className="text-7xl "> Under Development....</h2>
      <SignedOut>
        <Button onClick={() => navigate("/")} variant={"outline"}>
          Home
        </Button>
      </SignedOut>
      <SignedIn>
        <Button onClick={() => navigate("/dashboard")} variant={"outline"}>
          DashBoard
        </Button>
      </SignedIn>
    </div>
  );
};

export default Setting;
