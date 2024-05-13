// import { DynamicWidget } from "../DynamicWidget"

// export const Header = () => {
//     return (
//       <div className="flex m-5 items-center gap-x-6 rounded-lg p-6 justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
//         <p>
//           <span className="font-bold">EthEstates</span>
//         </p>
//         <DynamicWidget />
//       </div>
//     )
//   }

  "use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// import { DynamicWidget, SpinnerIcon } from "../lib/dynamic";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Fixtures", href: "/fixtures" },
  { name: "Leaderboard", href: "/leaderboard" },
];

// import { DynamicUserProfile, useDynamicContext } from "../lib/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { DynamicWidget } from "../DynamicWidget";

// import WelcomeModal from "./WelcomeModal";
// import ErrorModal from "./ErrorModal";
import Image from "next/image";

export const Header = () => {
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const { isAuthenticated } = useDynamicContext();

  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);
  return (
    <div>
      {/* {showModal && (
        <WelcomeModal
          close={() => {
            setShowModal(false);
          }}
          tx={txHash}
        />
      )} */}
      {/* {showErrorModal && (
        <ErrorModal
          close={() => {
            setShowErrorModal(false);
          }}
          balance={data != undefined ? data?.formatted : "0"}
        />
      )} */}
      <header className="inset-x-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                width={12}
                height={12}
                className="rounded-lg z-0"
                src="/next.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-200"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <DynamicWidget />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">EthEstates</span>
                <Image width={8} height={8} className="w-auto" src="/next.svg" alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 flex flex-col space-y-2 items-start justify-start">
                  <DynamicWidget />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}