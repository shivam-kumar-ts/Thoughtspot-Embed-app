import classes from "./index.module.css";

const Loading = () => {
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

export default Loading;
