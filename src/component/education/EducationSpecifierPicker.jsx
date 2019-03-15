import React from 'react'
import t from 'util/translate'

const EducationSpecifierPicker = () => (
  <div>
    <p>{t`Miltä alalta tutkinto on?`}</p>
    <select>
      <option value=''>{t`Hae alaa`}</option>
    </select>
  </div>
)

export default EducationSpecifierPicker
