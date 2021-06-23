import React, { Component } from "react";
import "../../css/index.css";
import {
  Header,
  Button,
  Dropdown,
  Input,
  Segment,
  Grid,
} from "semantic-ui-react";
import urlHelper from "../../helpers/urlHelper";

const formatOptions = [
  { key: "json", value: "json", text: "JSON" },
  { key: "xml", value: "xml", text: "XML" },
];

export class RequestSegment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: "default",
      format: "json",
      buttonColor: "blue",
      requestType: "GET",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleFormatChange = this.handleFormatChange.bind(this);
  }

  handleNameChange = (e, data) => {
    this.setState({
      name: data.value,
    });
  };

  handleFormatChange = (e, data) => {
    this.setState({
      format: data.value,
    });
  };

  async handleRequest() {
    this.setState({
      loading: true,
    });

    var request_data = await urlHelper.requestFactory(
      this.props.requestURL,
      this.state.requestType,
      { name: this.state.name },
      false,
      {
        Accept: "application/" + this.state.format,
      }
    );

    if (request_data.success === "success") {
      // the request has successful
      var formattedData = request_data.response.filmsList;

      console.log(formattedData);

      this.props.changeDataToParent(
        request_data.response.filmsList,
        formattedData,
        "json"
      );

      this.setState({
        buttonColor: "green",
        loading: false,
      });
    } else {
      // the request threw a error
      this.setState({
        buttonColor: "red",
        loading: false,
      });
    }
  }

  render() {
    return (
      <Segment padded basic>
        <Header as="h4">
          {this.props.requestTitle}
          <Header.Subheader>{this.props.requestDescription}</Header.Subheader>
        </Header>

        <Grid stackable>
          <Grid.Row columns={"equal"} stretched>
            <Grid.Column>
              <Input
                onChange={this.handleNameChange}
                placeholder="Search films by name"
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                onChange={this.handleFormatChange}
                placeholder="Select the return format"
                selection
                options={formatOptions}
              />
            </Grid.Column>
            <Grid.Column>
              <Button
                onClick={this.handleRequest}
                loading={this.state.loading}
                color={this.state.buttonColor}
                floated="right"
              >
                send {this.state.requestType} request
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default RequestSegment;
