const removeTypename = (key: string, value: any) =>
  key === '__typename' ? undefined : value

export const cleanVariables = (variables: any) =>
  JSON.parse(JSON.stringify(variables), removeTypename)
