import React from "react";
import "./ServerCard.css";
import Card from "react-bootstrap/Card";
import { IServer } from "../../common/interfaces";

export interface IServerCardProps {
  server: IServer;
  onDelete: (id: any) => void;
}

export interface IServerCardState {
    showUpdatedMessage: boolean;
}

export interface IServerCardState {}

export class ServerCard extends React.Component<
  IServerCardProps,
  IServerCardState
> {
  _fetchURL: string = "http://localhost:3005/servers";

  constructor (props: IServerCardProps){
      super(props);
      this.state = {
          showUpdatedMessage: false
      }
  }
  render() {
    const {
      id,
      alias,
      ip_address,
      time_created,
      server_status,
      provider_name
    } = this.props.server;
    return (
      <Card>
        <Card.Header as="h5">
          {alias}
          <button
            onClick={() => {
              this.handleServerStateChange(id, server_status);
            }}
          >
            {server_status ? "Turn off" : "Start"}
          </button>
        </Card.Header>
        <Card.Body>
          <Card.Title>{ip_address}</Card.Title>
          <Card.Subtitle>{provider_name}</Card.Subtitle>
          <button
            type="button"
            onClick={() => {
              console.log(id);
              this.props.onDelete(id);
            }}
          >
            Delete
          </button>

          <p>STATUS: {server_status ? "Active" : "Inactive"}</p>
        </Card.Body>
        <Card.Footer>{time_created}</Card.Footer>
      </Card>
    );
  }

  handleServerStateChange: (id: any, server_status: boolean) => void = async (
    id: any,
    server_status: boolean
  ) => {

    const data = {
        server_status: !server_status,
        id
    }
    await fetch(`${this._fetchURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result =>
        this.setState({
          showUpdatedMessage: true
        })
      );
  };
}

export default ServerCard;
