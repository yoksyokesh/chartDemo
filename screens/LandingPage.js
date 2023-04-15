import React, { useState } from "react";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";
import { data } from "../data";
import { VStack, Text } from "native-base";
import { useWindowDimensions } from "react-native";

const LandingPage = () => {
  const [chartData, setChartData] = useState(data);

  const [highlightRow, setHighlightRow] = useState(undefined);

  const { width } = useWindowDimensions();

  const containerWidth = {
    sm: width,
    xl: 1280,
  };

  return (
    <VStack flex={1} p={20} space={20} width={containerWidth}>
      <Text fontWeight={"bold"} fontSize={"xl"} mb={-16}>
        Maturity - Quantity chart
      </Text>
      <Chart
        chartData={chartData ?? []}
        setChartData={setChartData}
        setHighlightRow={setHighlightRow}
      />
      <DataTable
        chartData={chartData}
        setChartData={setChartData}
        highlightRow={highlightRow}
      />
    </VStack>
  );
};

export default LandingPage;
