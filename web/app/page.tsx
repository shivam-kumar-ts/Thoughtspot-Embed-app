import classes from "./styles/page.module.css";
import Intro from "@/app/components/intro";

export default function Home() {
  return (
    <div className={classes.container}>
      <Intro />
    </div>
  );
}
