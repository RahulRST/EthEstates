export const Footer = () => {
    return (
      <footer className="flex w-full justify-center p-8 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:bg-none">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} EthEstates. All rights reserved.
        </p>
      </footer>
    )
  }