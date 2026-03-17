import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

export function Main({
  narrow,
  fullscreen,
  children,
  ...rest
}: { fullscreen?: boolean, narrow?: boolean, children: React.ReactNode } & BreadcrumbsProps) {
  return (
    <main className={`p-6 ${fullscreen ? "fixed inset-0 bg-white z-50 overflow-auto" : ""}`}>
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs {...rest} />
      </div>
      <div className={`mx-auto max-w-${narrow ? 4 : 6}xl`}>
        {children}
      </div>
    </main>
  )
}