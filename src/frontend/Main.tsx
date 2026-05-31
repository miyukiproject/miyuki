import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";
import Footer from "./Footer";

export function Main({
  narrow,
  fullscreen,
  children,
  ...rest
}: { fullscreen?: boolean, narrow?: boolean, children: React.ReactNode } & BreadcrumbsProps) {
  return (
    <main className={`p-6 container ${fullscreen ? "fixed inset-0 bg-white z-50 overflow-auto" : ""}`}>
      <Breadcrumbs {...rest} />
      {children}
      {!fullscreen && <Footer />}
    </main>
  )
}