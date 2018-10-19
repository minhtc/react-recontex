import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

import pkg from "./package.json";
export default {
  input: "src/index.tsx",
  output: [
    {
      name: "react-recontext",
      file: pkg.main,
      format: "cjs",
      globals: { react: "React" },
      sourcemap: false
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true, tsconfig: "tsconfig.json" }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
};
