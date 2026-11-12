"use client";
import { useUserStore } from "@/lib/stores/userStore";
import Link from "next/link";
import { LuSettings } from "react-icons/lu";
import PopoverWrapper from "../ui/shadcn/PopoverWrapper";
import { useTheme } from "../ui/shadcn/theme-provider";
import { Switch } from "../ui/shadcn/switch";
import Image from "next/image";
// import { useOrganizationsStore } from "@/stores/organizationsStore"; change to partner store

const popoverButtonClassName =
  "flex gap-2 justify-between text-start rounded-none cursor-pointer px-3 py-1 text-sm text-foreground transition hover:bg-accent";

const HomePageButtons = () => {
  return (
    <>
      <Link href="/" className={popoverButtonClassName}>
        Home
      </Link>
      <Link href="/components" className={popoverButtonClassName}>
        Components
      </Link>
      <Link href="/forms" className={popoverButtonClassName}>
        Forms
      </Link>
      <Link href="/charts" className={popoverButtonClassName}>
        Charts
      </Link>
      <Link href="/tables" className={popoverButtonClassName}>
        Tables
      </Link>
      <Link href="/organizations" className={popoverButtonClassName}>
        Organizations
      </Link>
    </>
  );
};

const Navbar = () => {
  // const {
  //   reset,
  // } = useOrganizationsStore();
  const { session, signOut } = useUserStore();
  const { setTheme, theme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      {session.isAuthenticated ? (
        <header className="">
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                className={`max-h-9 ${theme === "dark" ? "[filter:invert(1)]" : ""}`}
              />
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-medium">
                  {session.userEmail?.charAt(0).toUpperCase() ?? "J"}
                </div>
                <span className="text-sm font-medium max-[600px]:hidden">
                  {session.userEmail ?? "John Doe"}
                </span>
                <PopoverWrapper
                  trigger={
                    <button
                      type="button"
                      className="p-2.5 bg-popover rounded-full cursor-pointer text-text-gray hover:text-foreground transition"
                    >
                      <LuSettings className="w-4 h-4" />
                    </button>
                  }
                  description={
                    <div className="flex flex-col ">
                      <HomePageButtons />
                      <button
                        className="text-start rounded-none px-3 py-1 text-sm text-foreground transition hover:bg-accent"
                        onClick={() => {
                          // reset();
                          signOut();
                        }}
                        type="button"
                      >
                        Sign out
                      </button>
                      <div className={popoverButtonClassName}>
                        <p>Dark mode</p>
                        <Switch
                          checked={theme === "dark"}
                          onCheckedChange={switchTheme}
                        />
                      </div>
                    </div>
                  }
                  className="w-max p-0 min-w-40 overflow-hidden"
                />
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="border-b backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500"
            >
              App Name
            </Link>
            <div className="flex items-center gap-2">
              <Link
                className="rounded-full border px-4 py-2 text-sm font-medium transition"
                href="/login"
              >
                Sign in
              </Link>
              <PopoverWrapper
                trigger={
                  <span className="flex p-2.5 bg-popover rounded-full cursor-pointer text-text-gray hover:text-foreground transition">
                    <LuSettings className="w-4 h-4" />
                  </span>
                }
                description={
                  <div className="flex flex-col ">
                    <HomePageButtons />
                    <div className={popoverButtonClassName}>
                      <p>Dark mode</p>
                      <Switch
                        checked={theme === "dark"}
                        onCheckedChange={switchTheme}
                      />
                    </div>
                  </div>
                }
                className="w-max p-0 min-w-40 overflow-hidden"
              />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
