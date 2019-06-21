import React from "react";
import "./AddServerForm.css";
import SelectProvider from "./SelectProvider/SelectProvider";
import { IProvider } from "../../common/interfaces";

interface IAddServerFormState {
  responseData: IAddedStatusData;
  aliasFieldValue: string;
  IpAddressFieldValue: string;
  selectedProvider: IProvider;
  showAddedMessage: boolean;
}

interface IAddServerProps {
    onAdd: () => void;
}

interface IAddedStatusData {
  status: string;
  addedServerAlias: string;
  addedServerIpAddress: string;
}

export class AddServerForm extends React.Component<
  IAddServerProps,
  IAddServerFormState
> {
  ADD_SERVER_URL: string = "http://localhost:3005/servers";

  constructor(props: IAddServerProps) {
    super(props);
    this.state = {
      responseData: {
        status: "",
        addedServerAlias: "",
        addedServerIpAddress: ""
      },
      aliasFieldValue: "",
      IpAddressFieldValue: "",
      selectedProvider: {
        provider_name: "",
        id: -1
      },
      showAddedMessage: false
    };
  }
  render() {
    const { responseData } = this.state;
    return (
      <div>
        <h2>Add a new server</h2>
        <form onSubmit={this.handleSubmit}>
          <span>New server alias: </span>
          <input
            value={this.state.aliasFieldValue}
            name="addServerAliasField"
            onChange={e => {
              this.updateAliasFieldState(e);
            }}
          />
          <span>New server IP address: </span>
          <input
            value={this.state.IpAddressFieldValue}
            name="addServerIpAddressField"
            onChange={e => {
              this.updateIpAddressFieldState(e);
            }}
          />
          <SelectProvider
            name="addServerProviderField"
            onSelectProvider={this.handleProviderSelect}
          />

          <button type="submit">Add</button>
        </form>

        <div
          style={{ display: this.state.showAddedMessage ? "block" : "none" }}
        >
          <div>
            New server with alias {responseData.addedServerAlias} (ip address -{" "}
            {responseData.addedServerIpAddress}){" "}
            {responseData.status === "success"
              ? "added successfully!"
              : "could not be added :("}
          </div>
        </div>
      </div>
    );
  }

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let data = {
      alias: this.state.aliasFieldValue,
      ip_address: this.state.IpAddressFieldValue,
      hostingId: this.state.selectedProvider.id,
      // defaults!!
      server_status: true,
      time_created: Date.now()
    };
    await fetch(this.ADD_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => this.setState({ responseData: result }));
    console.log(this.state.responseData);
  };

  updateAliasFieldState: (event: any) => void = (event: any) => {
    this.setState({
      aliasFieldValue: event.target.value
    });
  };

  updateIpAddressFieldState: (event: any) => void = (event: any) => {
    this.setState({
      IpAddressFieldValue: event.target.value
    });
  };

  handleProviderSelect: (selectedProvider: IProvider) => void = (
    selectedProvider: IProvider
  ) => {
    this.setState({
      selectedProvider
    });
  };
}

export default AddServerForm;
