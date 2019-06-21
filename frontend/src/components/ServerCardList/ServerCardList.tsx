import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IServer } from "../../common/interfaces";
import ServerCard from "../ServerCard/ServerCard";

export interface IServerCardListProps {
  updateList?: boolean;
}

export interface IServerCardListState {
  serversList: IServer[];
  isLoading: boolean;
  updateList?: boolean;
  showDeletedMessage: boolean;
}

export class ServerCardList extends React.Component<
  IServerCardListProps,
  IServerCardListState
> {
  _isMounted: boolean;
  _fetchURL: string = "http://localhost:3005/servers";

  constructor(props: IServerCardListProps) {
    super(props);
    this.state = {
      serversList: [],
      isLoading: true,
      updateList: false,
      showDeletedMessage: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.getServers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(
    prevProps: IServerCardListProps,
    prevState: IServerCardListState
  ) {
    if (prevState.updateList !== this.state.updateList) {
      this.getServers();
    }
  }

  static getDerivedStateFromProps(
    nextProps: IServerCardListProps,
    prevState: IServerCardListState
  ) {
    if (nextProps.updateList !== prevState.updateList) {
      return { updateList: nextProps.updateList };
    } else {
      return null;
    }
  }

  render() {
    const { isLoading, serversList } = this.state;
    return (
      <Row className="servers-list">
        {!isLoading
          ? serversList.map((server, index) => {
              return (
                <Col md={4}>
                  <ServerCard
                    server={server}
                    key={index}
                    onDelete={this.handleDelete}
                  />
                </Col>
              );
            })
          : "Loading..."}
          {this.state.showDeletedMessage ? <p>Server deleted from DB</p> : ""}
      </Row>
    );
  }

  getServers: () => void = async () => {
    await fetch(this._fetchURL)
      .then(res => res.json())
      .then(data => {
        if (this._isMounted)
          this.setState(
            {
              serversList: data
            },
            () => {
              this.setState({
                isLoading: false
              });
            }
          );
      });
  };

  handleDelete: (id: any) => void = async (id: any) => {
    await fetch(`${this._fetchURL}/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(result => this.setState({ 
          showDeletedMessage: true
       }));
  };
}

export default ServerCardList;
