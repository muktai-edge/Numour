import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Technology } from "./pages/Technology";
import { Science } from "./pages/Science";
import { Routines } from "./pages/Routines";
import { About } from "./pages/About";
import { Support } from "./pages/Support";
import { NotFound } from "./pages/NotFound";
import { Collection } from "./pages/Collection";
import { QA } from "./pages/QA";
import { MotionDemos } from "./pages/MotionDemos";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "collection/:slug", Component: Collection },
      { path: "product/:id", Component: ProductDetail },
      { path: "technology", Component: Technology },
      { path: "science", Component: Science },
      { path: "routines", Component: Routines },
      { path: "about", Component: About },
      { path: "support", Component: Support },
      { path: "warranty", Component: Support },
      { path: "numour-nook", Component: About },
      { path: "qa", Component: QA },
      { path: "motion-demos", Component: MotionDemos },
      { path: "*", Component: NotFound },
    ],
  },
]);