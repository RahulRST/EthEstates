import { DynamicWidget } from "../DynamicWidget"

export const Header = () => {
    return (
      <div className="flex m-5 items-center gap-x-6 rounded-lg p-6 justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
        <p>
          <span className="font-bold">EthEstates</span>
        </p>
        <DynamicWidget />
      </div>
    )
  }