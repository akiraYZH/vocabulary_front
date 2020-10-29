// 开启reduxDevTool
export default function reducDevTool() {
  return (
    process.env.NOT_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
