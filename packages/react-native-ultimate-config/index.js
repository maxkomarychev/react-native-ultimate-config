import { NativeModules } from "react-native";
import override from "./override";

const { UltimateConfig } = NativeModules;

export default { ...UltimateConfig, ...override };
