import * as babel from "@babel/core";
import { objectGrep } from "object-grep";
import { babelPluginFunctionTypeNameToArgument } from "./babel-plugin.js";

//function test<TSomeType>(a: TSomeType){};
//const test2 = <TSomeType2>(a:TSomeType2)=>{};
//test2<TSomeType22>("asd");

const code = `
var x = () => {
return test<TSomeType11>(11);
}
`;

var res = babel.transformSync(code, {
  plugins: [
    //"@babel/plugin-transform-runtime",
    "@babel/plugin-transform-typescript",
    babelPluginFunctionTypeNameToArgument,
  ],
  ast: true,
});

const x = objectGrep(res, "TSomeType", 50);

console.log(x);
