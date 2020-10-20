// 开启reduxDevTool
export default function reducDevTool() {
  return (
    process.env.NOT_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
