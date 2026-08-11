import { Routes, Route } from "react-router-dom";
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

export default function App() {
  const { isInitialized } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/liveboard"
        element={isInitialized ? <Liveboard /> : <LoadingComponent />}
      />
      <Route
        path="/viz"
        element={isInitialized ? <Viz /> : <LoadingComponent />}
      />
      <Route
        path="/search"
        element={isInitialized ? <Search /> : <LoadingComponent />}
      />
      <Route
        path="/spotter"
        element={isInitialized ? <Spotter /> : <LoadingComponent />}
      />
      <Route
        path="/full_app"
        element={isInitialized ? <FullApp /> : <LoadingComponent />}
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
