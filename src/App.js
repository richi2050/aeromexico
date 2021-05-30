
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme/theme'
import AppNavbar from './components/AppNavbar';
import Search from './components/Search';





function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <AppNavbar></AppNavbar>
      
          <Search>
          
          </Search>
        
      
      
    </ThemeProvider>
  );
}

export default App;
