const IMAGE_PATH =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

function ImageView({ $app, initialState, onImageClick }) {
  this.state = initialState; //
  this.$target = document.createElement("div");
  this.$target.className = "Modal ImageViewer";
  this.$target.style.display = "none";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      this.$target.innerHTML = `<div class="content"><img src="${IMAGE_PATH}${this.state}"></div>`;
      this.$target.style.display = "block";

      this.$target.addEventListener("click", onImageClick);
    } else {
      this.$target.style.display = "none";
    }
  };

  this.render();
}
export default ImageView;

{
  /* <div class="Modal ImageViewer">
<div class="content">
  <img src="./assets/sample_image.jpg">
</div> */
}
