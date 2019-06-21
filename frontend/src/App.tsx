import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ServerCardList from "./components/ServerCardList/ServerCardList";
import AddServerForm from "./components/AddServerForm/AddServerForm";

interface IAppState {
  update?: boolean;
}

interface IAppProps {

}

class App extends React.Component<IAppProps, IAppState> {

  constructor (props: any){
    super(props);
    this.state = {
      update: false
    }
  }


  render() {
    return (
      <Container>
        <ServerCardList updateList={this.state.update}/>
      </Container>
    );
  }


}

export default App;
