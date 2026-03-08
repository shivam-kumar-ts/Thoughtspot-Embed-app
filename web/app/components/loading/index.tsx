import classes from "./index.module.css";

const LoadingComponent = () => {
  return (
    <div className={classes.container}>
      <div className={classes.spinner}>
        <div className={classes.ring} />
        <div className={classes.ringInner} />
      </div>
      <span className={classes.text}>Loading analytics...</span>
    </div>
  );
};

export default LoadingComponent;
