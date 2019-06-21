import React from 'react';
import './ServerCard.css';
import Card from 'react-bootstrap/Card';
import { IServer } from '../../common/interfaces';

export interface IServerCardProps {
    server: IServer;
}

export interface IServerCardState {

}



export class ServerCard extends React.Component<IServerCardProps, IServerCardState> {
  render(){
    const {alias, ip_address, hostingId, time_created, server_status} = this.props.server;
    return (
      <Card>
          <Card.Header as="h5">
            {alias}
          </Card.Header>
          <Card.Body>
            <Card.Title>
                {ip_address}
            </Card.Title>
          </Card.Body>
          <Card.Footer>
            {time_created}
          </Card.Footer>
      </Card>
    );
  }
}

export default ServerCard;
