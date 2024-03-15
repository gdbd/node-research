import { stringLiteral } from "@babel/types";
import "colors";

const BABEL_VERSION = 7;

export const babelPluginFunctionTypeNameToArgument = (api, options) => {
  api.assertVersion(BABEL_VERSION);

  const functionsToChange = new Set(options?.functions);

  const getTypeName = (expression) => {
    return expression.typeParameters?.params.map((p) =>
      p.type === "TSTypeReference" && p.typeName.type === "Identifier"
        ? p.typeName.name
        : p.type === "TSLiteralType" && p.literal.type === "StringLiteral"
          ? p.literal.value
          : undefined,
    )?.[0];
  };

  return {
    visitor: {
      ExpressionStatement: (path) => {
        if (
          path.node.expression.type === "CallExpression" &&
          path.node.expression.callee.type === "Identifier"
          //   &&          functionsToChange.has(path.node.expression.callee.name)
        ) {
          const typeName = getTypeName(path.node.expression);

          if (typeName) {
            // path.node.expression.arguments.push(stringLiteral(typeName));
            console.log("found expression".bgGreen, typeName);
          }
        }
      },
      VariableDeclaration: (path) => {
        if (
          path.node.declarations[0].init?.type === "CallExpression" &&
          path.node.declarations[0].init.callee.type === "Identifier"
          //   &&          functionsToChange.has(path.node.declarations[0].init.callee.name)
        ) {
          const typeName = getTypeName(path.node.declarations[0].init);

          if (typeName) {
            /*path.node.declarations[0].init.arguments.push(
              stringLiteral(typeName),
            );*/
            console.log("found declaration".bgGreen, typeName);
          }
        }
      },
      ReturnStatement: (path) => {
        const typeName = getTypeName(path.node.argument);
        console.log("return", typeName);
      },
    },
  };
};
