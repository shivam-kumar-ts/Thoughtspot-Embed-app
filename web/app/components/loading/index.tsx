import classes from "./index.module.css";
import { PAGE_TEXT } from "@/app/utils/constants";

const LoadingComponent = () => {
  return (
    <div className={classes.container}>
      <div className={classes.spinner}>
        <div className={classes.ring} />
        <div className={classes.ringInner} />
      </div>
      <span className={classes.text}>{PAGE_TEXT.LOADING}</span>
    </div>
  );
};

export default LoadingComponent;
