import React from 'react';
import './App.css';
import ServerCard from './components/ServerCard/ServerCard';

class App extends React.Component {
  render(){
    return (
      <ServerCard server={{
        alias: 'TESTING',
        hostingId: 1,
        ip_address: "10.0.0.0",
        server_status: true,
        id: 1,
        time_created: 0
      }}/>
    );
  }
}

export default App;
