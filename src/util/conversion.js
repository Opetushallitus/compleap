export const snakeCaseToCamelCase = string => string
  .split('_')
  .filter(part => part.length > 0)
  .map((part, i) => {
    if (i === 0) return part.charAt(0).toLowerCase() + part.slice(1)
    return part.charAt(0).toUpperCase() + part.slice(1)
  })
  .join('')
