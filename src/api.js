const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ""}`);
    if (!res.ok) {
      throw new Error("[HTTP ERROR!]");
    }
    return await res.json();
  } catch (e) {
    throw new Error(`ERROR: ${e.message}`);
  }
};

export { request };
