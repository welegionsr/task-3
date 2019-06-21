import React from 'react';
import './ServerCard.css';
import Card from 'react-bootstrap/Card';
import { IServer } from '../../common/interfaces';

export interface IServerCardProps {
    server: IServer;
    onDelete: (id: any) => void;
}

export interface IServerCardState {

}



export class ServerCard extends React.Component<IServerCardProps, IServerCardState> {
  render(){
    const {id, alias, ip_address, time_created, server_status, provider_name} = this.props.server;
    return (
      <Card>
          <Card.Header as="h5">
            {alias}
          </Card.Header>
          <Card.Body>
            <Card.Title>
                {ip_address}
            </Card.Title>
            <Card.Subtitle>
                {provider_name}
            </Card.Subtitle>
            <button type="button" onClick={()=> {this.props.onDelete(id)}}>
                Delete
            </button>
          </Card.Body>
          <Card.Footer>
            {time_created}
          </Card.Footer>
      </Card>
    );
  }
}

export default ServerCard;
