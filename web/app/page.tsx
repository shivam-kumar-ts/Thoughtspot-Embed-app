import classes from "./styles/page.module.css";
import Intro from "@/app/components/intro";
import EnvConfig from "@/app/components/envConfig";

export default function Home() {
  return (
    <div className={classes.container}>
      <Intro />
      <EnvConfig />
    </div>
  );
}
