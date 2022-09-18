import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CategoriesProvider } from "../src/context/CategoriesContext";
import { EntriesProvider } from '../src/context/EntriesContext';

import '../src/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CategoriesProvider>
      <EntriesProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </EntriesProvider>
    </CategoriesProvider>
  );
}

export default MyApp
