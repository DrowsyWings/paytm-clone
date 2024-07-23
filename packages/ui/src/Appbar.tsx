import { Button } from "./button";
import Link from "next/link";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <header className=" bg-indigo-300 border-black  flex items-center justify-between px-4 py-3 shadow-sm md:px-6">
      <Link href="" className="flex items-center" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold text-[#6a51a6]">Acme Pay</span>
      </Link>
      <nav className="hidden space-x-4 md:flex">
        <Link
          href="/transfer"
          className="  hover:underline underline-offset-4 font-semibold text-[#5d4791]"
          prefetch={false}
        >
          Transfer
        </Link>
        <Link
          href="/transactions"
          className=" font-semibold text-[#5d4791] hover:underline underline-offset-4"
          prefetch={false}
        >
          Transactions
        </Link>
        <Link
          href="/p2p"
          className=" font-semibold text-[#5d4791] hover:underline underline-offset-4"
          prefetch={false}
        >
          P2P
        </Link>
      </nav>
      <Button onClick={user ? onSignout : onSignin}>
        {user ? "Logout" : "Login"}
      </Button>
    </header>
  );
};

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
