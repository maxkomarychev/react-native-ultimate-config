import NativeUltimateConfig from "./src/NativeUltimateConfig";
import override from "./override";

export default { ...NativeUltimateConfig.getConfigValues(), ...override };
