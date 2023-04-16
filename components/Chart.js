import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { updateChartProps } from "../functions/utils";

const Chart = (props) => {
  const { chartData: renderData, setChartData, setHighlightRow } = props;
  const [dblClickIndex, setDblClickIndex] = useState(undefined);

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
          ondragend: function (dx, dy) {
            if (
              dblClickIndex !== undefined &&
              dblClickIndex === seriesIndex &&
              oneLineData.length <= 2
            )
              onPointDraggingPushDataPoint(seriesIndex, dataIndex, [
                this.x,
                this.y,
              ]);
          },
          ondrag: function (dx, dy) {
            if (dblClickIndex === undefined || dblClickIndex !== seriesIndex)
              onPointDragging(seriesIndex, dataIndex, [this.x, this.y]);
          },
          ondblclick: (props) => {
            if (oneLineData.length <= 2) setDblClickIndex(seriesIndex);
            else setDblClickIndex(undefined);
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

    eChartsRef.current?.getEchartsInstance().setOption({
      series: chartData,
    });
  }

  function onPointDraggingPushDataPoint(seriesIndex, dataIndex, pos) {
    setDblClickIndex(undefined);
    let data = chartData;
    data[seriesIndex]["data"].push(
      eChartsRef.current?.getEchartsInstance().convertFromPixel("grid", pos)
    );

    setChartData([...data]);
  }

  eChartsRef.current
    ?.getEchartsInstance()
    .getZr()
    .on("dblclick", function (params) {
      if (params.target === undefined) {
        setDblClickIndex(undefined);
        const dataPoints = eChartsRef.current
          ?.getEchartsInstance()
          .convertFromPixel("grid", [params.offsetX, params.offsetY]);
        setChartData([
          ...renderData,
          { name: "Buy-$60", data: [[...dataPoints]] },
        ]);
      }
    });

  return (
    <ReactECharts option={option} ref={eChartsRef} style={{ height: 800 }} />
  );
};

export default Chart;
