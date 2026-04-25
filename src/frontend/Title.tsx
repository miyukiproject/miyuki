import React from "react"

export function ContentTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-bold mb-4">{children}</h1>
}

export function ContentChildrenTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold mb-3">{children}</h2>
}

export function ContentChildTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-semibold mb-2">{children}</h3>
}