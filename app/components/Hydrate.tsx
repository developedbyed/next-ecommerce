"use client"

import { useThemeStore } from "@/store"
import { ReactNode, useEffect, useState } from "react"

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const themeStore = useThemeStore()
  //Wait till Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <>
      {isHydrated ? (
        <body
          className="px-4 lg:px-48 font-roboto"
          data-theme={themeStore.mode}
        >
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  )
}
