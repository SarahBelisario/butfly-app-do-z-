import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

export function AsyncAutoComplete({ name, data, fetchData, setData, control, label, isRequired }: any) {
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  async function startFetch(event: any, value: any) {
    if (!isFocused || value.length <= 3) return setData([])
    setLoading(true)
    await fetchData()
    setLoading(false)
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: isRequired }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          loading={loading}
          options={data}
          onInputChange={useDebouncedCallback(startFetch, 500)}
          getOptionLabel={(option: { name: string }) => option?.name}
          blurOnSelect
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={(_, data) => onChange(data)}
          renderInput={params => (
            <TextField
              label={label}
              variant="outlined"
              required={isRequired}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="primary" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  )
}
