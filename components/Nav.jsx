"use client";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Nav = () => {
    const { data: session}  = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdowm] = useState(false);

  //this provider is  for login
  useEffect(() => {
    const _setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    _setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-3 flex-center">
        <Image
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
          src={"/assets/images/logo.svg"}
        />
        <p className="logo_text">Promptopia</p>
      </Link>


      {/* Desktop  Navigation */}


      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
               
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdowm((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  onClick={() => setToggleDropdowm(false)}
                  href="/profile"
                >
                  My Profile
                </Link>

                <Link
                  className="dropdown_link"
                  onClick={() => setToggleDropdowm(false)}
                  href="/create-promp"
                >
                  Create Prompt
                </Link>
                <button type="button" className="mt-5 w-full black_btn"
                 onClick={()=>{setToggleDropdowm(false); signOut(); } }>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
