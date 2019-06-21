import React from "react";
import { IProvider } from "../../../common/interfaces";

export interface ISelectProviderProps {
  onSelectProvider: (selectedProvider: IProvider) => void;
  name: string;
}

export interface ISelectProviderState {
  currentSelected: IProvider;
  providersList: IProvider[];
  isLoading: boolean;
}

export class SelectProvider extends React.Component<
  ISelectProviderProps,
  ISelectProviderState
> {

    _fetchURL: string = 'http://localhost:3005/hosting';
    _isMounted: boolean;
  constructor(props: ISelectProviderProps) {
    super(props);
    this.state = {
      currentSelected: {
          provider_name: '',
          id: -1
      },
      providersList: [],
      isLoading: true
    };

    this._isMounted = false;
  }

  componentDidMount(){
      this._isMounted = true;
      this.getProviders();
  }

  componentWillUnmount(){
      this._isMounted = false;
  }

  handleChange: (event: any) => void = (event: any) => {
    this.setState({ currentSelected: {
        id: event.target.value,
        provider_name: this.getProviderById(Number(event.target.value))
    }}, () => {
        console.log(this.state.currentSelected.provider_name);
        //tell the parent to update its state
        this.props.onSelectProvider(this.state.currentSelected);
    });


  }

  render() {
    return (
        <label>
          Service Provider:
          <select name={this.props.name} value={this.state.currentSelected.provider_name} onChange={this.handleChange}>
            {this.state.providersList.map((provider, index) => {
                return (
                    <option key={index} value={provider.id}>{provider.provider_name}</option>
                );
            })}
          </select>
        </label>
    );
  }

  getProviders: () => void = async () => {
    await fetch(this._fetchURL)
      .then(res => res.json())
      .then(data => {
        if (this._isMounted)
          this.setState(
            {
              providersList: data
            },
            () => {
              console.log(this.state.providersList);
              this.setState({
                isLoading: false
              });
            }
          );
      });
  };

  getProviderById: (providerId: number) => string = (providerId: number) => {
      //not a lot of time for TypeScript bs
      const providerFound: any = this.state.providersList.find(provider => provider.id === providerId);

      return providerFound.provider_name;
  }
}

export default SelectProvider;
