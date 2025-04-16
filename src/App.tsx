// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
// import DashBoard from "./pages/dashboard";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import PlsSign from "./components/ui/PlsSign";
import NotFound from "./components/ui/NotFound";
import Setting from "./pages/Setting";

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
