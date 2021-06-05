import "./assets/styles/vendor/bootstrap.min.css";

let render = () => {
  import("./assets/styles/phoenix.main.scss").then((x) => {
    require("./AppRenderer");
  });
};
render();
