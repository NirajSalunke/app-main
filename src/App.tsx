// import React from "react";
import { Route, Routes } from "react-router-dom";
// import DashBoard from "./pages/dashboard";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import PlsSign from "./components/ui/PlsSign";
import NotFound from "./components/ui/NotFound";
import Setting from "./pages/Setting";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard/*"
        element={
          <>
            <SignedIn>
              <DashBoard />
            </SignedIn>
            <SignedOut>
              <PlsSign />
            </SignedOut>
          </>
        }
      />
      <Route path="/settings" element={<Setting />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
