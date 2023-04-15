import React from "react";
import ReactECharts from "echarts-for-react";
import { updateChartProps } from "../functions/utils";

const Chart = (props) => {
  const { chartData: renderData, setChartData, setHighlightRow } = props;

  const symbolSize = 20;

  const chartData = renderData.map((item) => {
    return {
      data: item.data,
      name: item.name,
      type: "line",
      symbolSize: symbolSize,
      ...updateChartProps(item.data.length),
    };
  });

  const eChartsRef = React.useRef(null);
  if (eChartsRef && eChartsRef.current)
    eChartsRef.current?.getEchartsInstance().setOption({
      series: chartData,
    });

  let option = {
    tooltip: {
      triggerOn: "none",
      formatter: function (params) {
        return (
          params.seriesName +
          "<br>" +
          "Maturity (years): " +
          params.data[0].toFixed(2) +
          "<br>Quantity: " +
          params.data[1].toFixed(2)
        );
      },
    },
    grid: {
      bottom: "15%",
    },
    xAxis: {
      name: "Maturity (years)",
      nameLocation: "middle",
      nameTextStyle: {
        padding: 20,
      },
      type: "value",
      position: "bottom",
      axisLine: { onZero: true },
      axisLabel: { onZero: true },
    },
    yAxis: {
      name: "Quantity",
      nameLocation: "middle",
      nameTextStyle: {
        padding: 20,
      },
      type: "value",
      axisLine: { onZero: false },
    },
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        filterMode: "none",
      },
      {
        left: 0,
        type: "slider",
        yAxisIndex: 0,
        filterMode: "none",
      },
      {
        type: "inside",
        xAxisIndex: 0,
        filterMode: "none",
      },
      {
        type: "inside",
        yAxisIndex: 0,
        filterMode: "none",
      },
    ],
    series: chartData,
  };

  const setGraphicProperty = () => {
    const graphicData = [];

    chartData.forEach((seriesItem, seriesIndex) => {
      const oneLineData = seriesItem.data;
      oneLineData.forEach((item, dataIndex) => {
        graphicData.push({
          type: "circle",
          position: eChartsRef.current
            ?.getEchartsInstance()
            .convertToPixel("grid", item),
          shape: {
            cx: 0,
            cy: 0,
            r: symbolSize / 2,
          },
          invisible: true,
          draggable: true,
          ondrag: function (dx, dy) {
            onPointDragging(seriesIndex, dataIndex, [this.x, this.y]);
          },
          onclick: function (props) {
            setHighlightRow(seriesIndex);
          },
          onmousemove: function () {
            showTooltip(seriesIndex, dataIndex);
          },
          onmouseout: function () {
            hideTooltip(seriesIndex, dataIndex);
          },
          z: 100,
        });
      });
    });

    return graphicData;
  };

  setTimeout(function () {
    // Add shadow circles (which is not visible) to enable drag.
    eChartsRef.current?.getEchartsInstance().setOption({
      graphic: setGraphicProperty(),
    });
  }, 0);

  window.addEventListener("resize", updatePosition);

  eChartsRef.current?.getEchartsInstance().on("dataZoom", updatePosition);

  const setGraphicPropertyPosition = () => {
    const graphicData = [];

    chartData.forEach((seriesItem, seriesIndex) => {
      const oneLineData = seriesItem.data;
      oneLineData.forEach((item, dataIndex) => {
        graphicData.push({
          position: eChartsRef.current
            ?.getEchartsInstance()
            .convertToPixel("grid", item),
        });
      });
    });

    return graphicData;
  };

  function updatePosition(params) {
    eChartsRef.current?.getEchartsInstance().setOption({
      graphic: setGraphicPropertyPosition(),
    });
  }

  function showTooltip(seriesIndex, dataIndex) {
    eChartsRef.current?.getEchartsInstance().dispatchAction({
      type: "showTip",
      seriesIndex: seriesIndex,
      dataIndex: dataIndex,
    });
  }

  function hideTooltip(seriesIndex, dataIndex) {
    eChartsRef.current?.getEchartsInstance().dispatchAction({
      type: "hideTip",
    });
  }

  function onPointDragging(seriesIndex, dataIndex, pos) {
    let data = chartData;
    data[seriesIndex]["data"][dataIndex] = eChartsRef.current
      ?.getEchartsInstance()
      .convertFromPixel("grid", pos);

    setChartData([...data]);

    // Update data
    eChartsRef.current?.getEchartsInstance().setOption({
      series: chartData,
    });
  }

  return (
    <ReactECharts option={option} ref={eChartsRef} style={{ height: 800 }} />
  );
};

export default Chart;
