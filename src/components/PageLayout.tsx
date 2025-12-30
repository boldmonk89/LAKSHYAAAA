import { ReactNode, useEffect } from "react";
import MainNavigation from "./MainNavigation";
import ScrollProgress from "./ScrollProgress";
import ScrollToTop from "./ScrollToTop";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <MainNavigation />
      {children}
    </main>
  );
};

export default PageLayout;
