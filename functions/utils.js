export const updateChartProps = (dataLength) => {
  if (dataLength === 3)
    return {
      symbol: "diamond",
      color: "#4CBB17",
    };
  else if (dataLength === 2)
    return {
      symbol: "circle",
      color: "#ff0000",
    };
  else
    return {
      symbol: "triangle",
      color: "#090c9b",
    };
};

export const orderType = (dataLength) => {
  if (dataLength === 1) return "Single";
  else if (dataLength === 2) return "Double";
  else if (dataLength === 3) return "Triple";
  return "New Order";
};

export function isNumber(str) {
  return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}

export const inputValidation = (text, stateFunc) => {
  if (!text.length) stateFunc("");
  if (text.slice(-1) === "." && text.split(".").length - 1 > 1) {
    return;
  }
  if (text.slice(-1) === "." || text.slice(-1) === "-") stateFunc(text);
  if (text.slice(-1) === "." && text.length === 1) stateFunc("");

  if (isNumber(text)) stateFunc(text);
};
