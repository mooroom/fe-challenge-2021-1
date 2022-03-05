function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state.isRoot) {
      console.log("not root!!");
      this.$target.innerHTML = `<div class="Node"><img src="/assets/prev.png"></div>`;
    } else {
      this.$target.innerHTML = "";
    }

    this.$target.innerHTML += this.state.nodes
      .map(
        (node) =>
          `<div class="Node" data-node-id="${node.id}"><img src="/assets/${
            node.type === "DIRECTORY" ? "directory" : "file"
          }.png"><div>${node.name}</div></div>`
      )
      .join("");

    this.$target.querySelectorAll(".Node").forEach((node) => {
      if (node.dataset.nodeId) {
        node.addEventListener("click", () => onClick(node.dataset.nodeId));
      } else {
        node.addEventListener("click", () => onBackClick());
      }
    });
  };

  this.render();
}

export default Nodes;

// <div class="Node">
// <img src="./assets/prev.png">
// </div>
// <div class="Node">
// <img src="./assets/directory.png">
// <div>2021/04</div>
// </div>
// <div class="Node">
// <img src="./assets/file.png">
// <div>하품하는 사진</div>
// </div>
