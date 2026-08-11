import "./styles/page.module.css";
import classes from "./styles/page.module.css";
import Intro from "./components/intro";
import EnvConfig from "./components/envConfig";

export default function App() {
  return (
    <div className={classes.container}>
      <Intro />
      <EnvConfig />
    </div>
  );
}
