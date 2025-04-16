import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { FlipText } from "./magicui/flip-text";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useUser();

  const createUser = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/newuser",
        {
          ClerkID: user.user?.id,
          Email: user.user?.emailAddresses[0].emailAddress,
          Password: import.meta.env.VITE_SECRET_KEY,
        },
        {
          headers: {
            clerkID: user.user?.id,
            secret_key: import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (response.status === 201 || response.status === 208) {
        toast("Entered the Vault Successfully");
      }
    } catch (error) {
      toast("Something went Wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.isLoaded && user.isSignedIn) {
      createUser();
    }
  }, [user.isLoaded]);
  return (
    <nav className="w-screen flex bg-black items-center justify-between  p-10 h-[8vh]">
      <div className="flex items-center justify-center  gap-5">
        <img alt="logo" src="./code.svg" className="scale-150" />
        <FlipText className="text-xl sm:hidden  font-extrabold -tracking-widest  text-black dark:text-white">
          Vault Base
        </FlipText>
      </div>
      <div className="flex justify-center items-center gap-5">
        <SignedIn>
          <Button variant={"outline"} onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button variant="default" className=" cursor-pointer">
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
