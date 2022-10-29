import Calendar from 'react-calendar'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { Button, Popover, Box } from '@mui/material'

function DateDropdown({
  label,
  onChange,
  value,
  btnStyles = {},
  btnVariant = 'contained',
  calendarProps,
}) {
  return (
    <>
      <PopupState variant='popover' popupId='demo-popup-popover'>
        {(popupState) => (
          <div>
            <Button
              size='large'
              sx={{ ...btnStyles }}
              variant={btnVariant}
              {...bindTrigger(popupState)}
            >
              {label}
            </Button>
            <Popover
              sx={{ mt: 1 }}
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box sx={{ p: 2 }}>
                <Calendar
                  onChange={onChange}
                  value={value}
                  {...calendarProps}
                />
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
    </>
  )
}

export default DateDropdown
