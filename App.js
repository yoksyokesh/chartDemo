import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  VStack,
  Text,
  Button,
  ScrollView,
} from "native-base";
import Chart from "./components/Chart";
import DataTable from "./components/DataTable";
import { useWindowDimensions } from "react-native";
import { data } from "./data";

export default function App() {
  const [chartData, setChartData] = useState(data);

  const [highlightRow, setHighlightRow] = useState(undefined);

  const { width } = useWindowDimensions();

  const containerWidth = {
    sm: width,
    xl: 1280,
  };

  return (
    <NativeBaseProvider>
      <ScrollView _contentContainerStyle={{ flex: 1, alignItems: "center" }}>
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
      </ScrollView>
    </NativeBaseProvider>
  );
}
