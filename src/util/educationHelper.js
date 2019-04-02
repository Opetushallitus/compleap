export const isVocational = id => id === '2'
export const isHigherEducation = id => ['4', '5', '6'].includes(id)
export const canHaveSpecifier = id => isVocational(id) || isHigherEducation(id)
