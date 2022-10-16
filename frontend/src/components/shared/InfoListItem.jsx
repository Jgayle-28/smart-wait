import PropTypes from 'prop-types'
import { Box, ListItem, ListItemText, Typography } from '@mui/material'

function InfoListItem(props) {
  const { align, children, disableGutters, value, label, ...other } = props

  return (
    <>
      <ListItem
        sx={{
          px: disableGutters ? 0 : 3,
          py: 1.5,
        }}
        {...other}
      >
        <ListItemText
          disableTypography
          primary={
            <Typography
              sx={{ minWidth: align === 'vertical' ? 'inherit' : 180 }}
              variant='subtitle2'
            >
              {label}
            </Typography>
          }
          secondary={
            <Box
              sx={{
                flex: 1,
                mt: align === 'vertical' ? 0.5 : 0,
              }}
            >
              {children || (
                <Typography color='textSecondary' variant='body2'>
                  {value}
                </Typography>
              )}
            </Box>
          }
          sx={{
            display: 'flex',
            flexDirection: align === 'vertical' ? 'column' : 'row',
            my: 0,
          }}
        />
      </ListItem>
    </>
  )
}

InfoListItem.defaultProps = {
  align: 'vertical',
}

InfoListItem.propTypes = {
  align: PropTypes.oneOf(['horizontal', 'vertical']),
  children: PropTypes.node,
  disableGutters: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default InfoListItem
