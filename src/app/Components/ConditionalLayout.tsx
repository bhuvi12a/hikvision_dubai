"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbra";
import Footer from "./Footer";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the current page is admin, dashboard, or auth related
  const isAdminPage = pathname.startsWith("/admin");
  const isAuthPage = pathname.startsWith("/auth");
  const isDashboardPage = pathname.startsWith("/dashboard");

  // Hide Navbar for admin, auth (login), and dashboard pages
  const hideLayout = isAdminPage || isAuthPage || isDashboardPage;

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <WhatsAppIcon/>
      {children}
      <Footer />
    </>
  );
}
