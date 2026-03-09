import { TurboModuleRegistry, type TurboModule } from "react-native";

export interface Spec extends TurboModule {
  getConfigValues(): {
    [key: string]: string;
  };
}

export default TurboModuleRegistry.getEnforcing<Spec>("UltimateConfig");
