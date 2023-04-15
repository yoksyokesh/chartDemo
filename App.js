import React from "react";
import { NativeBaseProvider, ScrollView } from "native-base";
import LandingPage from "./screens/LandingPage";

export default function App() {
  return (
    <NativeBaseProvider>
      <ScrollView _contentContainerStyle={{ flex: 1, alignItems: "center" }}>
        <LandingPage />
      </ScrollView>
    </NativeBaseProvider>
  );
}
