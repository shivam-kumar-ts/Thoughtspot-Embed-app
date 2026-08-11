import { Routes, Route, Outlet } from "react-router-dom";
import { useContext } from "react";
import classes from "./styles/page.module.css";
import Intro from "./components/intro";
import EnvConfig from "./components/envConfig";
import Liveboard from "./(embed_v01)/liveboard/page";
import Viz from "./(embed_v01)/viz/page";
import Search from "./(embed_v01)/search/page";
import Spotter from "./(embed_v01)/spotter/page";
import FullApp from "./(embed_v01)/full_app/page";
import NotFound from "./not-found";
import LoadingComponent from "./components/loading";
import AppContext from "./contexts/AppContext";

function Home() {
  return (
    <div className={classes.container}>
      <Intro />
      <EnvConfig />
    </div>
  );
}

function EmbedLayout() {
  const { isInitialized } = useContext(AppContext);
  return isInitialized ? <Outlet /> : <LoadingComponent />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<EmbedLayout />}>
        <Route path="/liveboard" element={<Liveboard />} />
        <Route path="/viz" element={<Viz />} />
        <Route path="/search" element={<Search />} />
        <Route path="/spotter" element={<Spotter />} />
        <Route path="/full_app" element={<FullApp />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
