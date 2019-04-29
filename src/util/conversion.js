export const snakeCaseToCamelCase = string => string
  .split('_')
  .filter(part => part.length > 0)
  .map((part, i) => {
    if (i === 0) return part.toLowerCase()
    return part.charAt(0).toUpperCase() + part.slice(1)
  })
  .join('')
