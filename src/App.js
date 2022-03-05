import { request } from "./api.js";
import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import Loading from "./Loading.js";
import ImageView from "./ImageView.js";

function App($app) {
  this.state = {
    isRoot: true,
    nodes: [],
    depth: [],
    loading: false,
    imgPath: "",
  };

  const cache = {};

  const fetchNodes = async (clickedNode) => {
    this.setState({ ...this.state, loading: true });
    try {
      const newNodes = await request(clickedNode ? clickedNode.id : null);
      // console.log(newNodes);
      this.setState({
        ...this.state,
        isRoot: clickedNode ? false : true,
        nodes: newNodes,
        depth: clickedNode ? [...this.state.depth, clickedNode] : [],
      });

      clickedNode
        ? (cache[clickedNode.id] = newNodes)
        : (cache.root = newNodes);
    } catch (e) {
      throw new Error(e);
    } finally {
      this.setState({ ...this.state, loading: false });
      console.log(this.state);
      // console.log(cache);
    }
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClickBreadCrumb: (nodeId) => {
      console.log("node id: ", nodeId);
      const currentNode = this.state.depth[this.state.depth.length - 1];
      const sliceIndex = this.state.depth.findIndex(
        (node) => node.id === nodeId
      );
      if (currentNode.id !== nodeId) {
        this.setState({
          ...this.state,
          isRoot: nodeId === "root" ? true : false,
          nodes: cache[nodeId],
          depth: this.state.depth.slice(0, sliceIndex + 1),
        });
      }
    },
  });
  const nodes = new Nodes({
    $app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: (nodeId) => {
      const clickedNode = this.state.nodes.find((node) => node.id === nodeId);
      if (clickedNode.type === "DIRECTORY") {
        if (nodeId in cache) {
          this.setState({
            ...this.state,
            isRoot: false,
            nodes: cache[nodeId],
            depth: [...this.state.depth, clickedNode],
          });
        } else {
          fetchNodes(clickedNode);
        }
      } else {
        this.setState({ ...this.state, imgPath: clickedNode.filePath });
      }
    },
    onBackClick: () => {
      console.log("go to back!");
      this.state.depth.pop();
      const currentNode = this.state.depth[this.state.depth.length - 1];

      if (this.state.depth.length > 0) {
        this.setState({ ...this.state, nodes: cache[currentNode.id] });
      } else {
        this.setState({ ...this.state, isRoot: true, nodes: cache.root });
      }
    },
  });
  const loading = new Loading({
    $app,
    initialState: this.state.loading,
  });
  const imageView = new ImageView({
    $app,
    initialState: this.state.imgPath,
    onImageClick: () => this.setState({ ...this.state, imgPath: "" }),
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes });
    loading.setState(this.state.loading);
    imageView.setState(this.state.imgPath);
  };

  this.init = async () => {
    fetchNodes();
  };

  this.init();
}

export default App;
