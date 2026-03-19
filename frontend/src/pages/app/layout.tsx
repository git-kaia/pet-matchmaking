import "@/style/global.css";

import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import ContentWrapper from "@/components/layout/containers/content-wrapper";
import Footer from "@/components/layout/containers/footer";
import Header from "@/components/layout/containers/header";
import Main from "@/components/layout/containers/main";
import LeftMenu from "@/components/layout/menu/left-menu";
import MenuBackdrop from "@/components/layout/menu/menu-backdrop";
import RightMenu from "@/components/layout/menu/right-menu";
import { DEFAULTS } from "@/config";
import Loading from "@/pages/loading";

export default function AppLayout() {
  return (
    <>
      <Header />
      <Main>
        <LeftMenu />
        <ContentWrapper>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </ContentWrapper>
        {!DEFAULTS.rightMenuAlwaysHidden && <RightMenu />}
      </Main>
      <Footer />
      <MenuBackdrop />
    </>
  );
}
