function Loading({ $app, initialState }) {
  this.state = initialState; //true or false
  this.$target = document.createElement("div");
  this.$target.className = "Modal Loading";
  this.$target.innerHTML = `<div class="content"><img src="/assets/nyan-cat.gif" alt="loader"></div>`;
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.style.display = this.state ? "block" : "none";
  };

  this.render();
}

export default Loading;
