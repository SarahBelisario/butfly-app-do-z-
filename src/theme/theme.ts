import { createTheme } from '@mui/material/styles';
import { buttons } from './overrides/button';
import { inputs } from './overrides/input';
const theme = createTheme({
  palette: {
    primary: { main: '#6200ff' },
    secondary: { main: '#f62681' },
  },
  typography: {
    "fontFamily": `"Lato", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    ...inputs,
    ...buttons
  }
});

export default theme;
