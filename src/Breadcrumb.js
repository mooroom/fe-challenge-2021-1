function Breadcrumb({ $app, initialState, onClickBreadCrumb }) {
  this.state = initialState;
  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div class="bc-item" data-node-id="root">root</div>${this.state
      .map(
        (node) =>
          `<div class="bc-item" data-node-id="${node.id}">${node.name}</div>`
      )
      .join("")}`;

    this.$target.querySelectorAll(".bc-item").forEach((item) => {
      const { nodeId } = item.dataset;
      item.addEventListener("click", () => onClickBreadCrumb(nodeId));
    });
  };

  this.render();
}

export default Breadcrumb;
