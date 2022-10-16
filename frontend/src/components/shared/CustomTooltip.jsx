import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

function CustomTooltip({ children, ...rest }) {
  // Customize toolip
  const CustomizedCustom = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    fontSize: '20px',
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.primary.main,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  }))
  // Return styled tool tip
  return <CustomizedCustom {...rest}>{children}</CustomizedCustom>
}

export default CustomTooltip
