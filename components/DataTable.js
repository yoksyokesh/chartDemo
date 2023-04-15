import React from "react";
import { VStack, HStack, Text, Divider } from "native-base";
import DataTableHeader from "./DataTableHeader";
import DataTableRow from "./DataTableRow";

const DataTable = (props) => {
  const { chartData, setChartData, highlightRow } = props;

  return (
    <VStack
      space={2}
      borderColor={"#343434"}
      borderWidth={2}
      borderRadius={10}
      p={2}
    >
      <DataTableHeader />
      <Divider orientation="horizontal" bgColor={"#343434"} />
      {chartData &&
        chartData.length > 0 &&
        chartData.map((item, index) => (
          <VStack space={2} key={Math.random()}>
            <DataTableRow
              highlight={index === highlightRow}
              chartData={chartData}
              setChartData={setChartData}
              dataIndex={index}
              key={Math.random()}
            />
            {index !== chartData.length - 1 && (
              <Divider
                orientation="horizontal"
                bgColor="#343434"
                key={Math.random()}
              />
            )}
          </VStack>
        ))}
    </VStack>
  );
};

export default DataTable;
