import React, { useState } from 'react'
import { dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import useTranslation from 'component/generic/hook/useTranslation'
import Button from 'component/generic/widget/Button'
import TextInput from 'component/generic/widget/TextInput'
import InputContainer from './fragment/InputContainer'
import InputLabel from './fragment/InputLabel'

const NameInput = () => {
  const [name, setName] = useState()
  const t = useTranslation()

  return (
    <>
      <InputContainer>
        <InputLabel>
          <label htmlFor={'name'}>
            {t`Aloita syöttämällä nimesi`}
          </label>
        </InputLabel>
        <TextInput
          id='name'
          type='text'
          placeholder='Nimi'
          onChange={event => setName(event.target.value)}
        />
      </InputContainer>
      <Button
        onClick={() => dispatch({ type: UserEvent.ENTER_NAME, data: { name } })}
        disabled={!name || name.length === 0 || name.length >= 25}
      >
        {t`Jatka`}
      </Button>
    </>
  )
}

export default NameInput
