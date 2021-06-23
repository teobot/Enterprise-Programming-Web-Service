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
import formatHelper from "../../helpers/formatHelper";

const formatOptions = [
  { key: "json", value: "json", text: "JSON" },
  { key: "xml", value: "xml", text: "XML" },
  { key: "text", value: "text", text: "TEXT" },
];

const searchBy = [
  {
    key: "rating",
    value: "rating",
    text: "rating",
  },
  {
    key: "id",
    value: "id",
    text: "id",
  },
  {
    key: "title",
    value: "title",
    text: "title",
  },
  {
    key: "year",
    value: "year",
    text: "year",
  },
  {
    key: "director",
    value: "director",
    text: "director",
  },
  {
    key: "stars",
    value: "stars",
    text: "stars",
  },
  {
    key: "review",
    value: "review",
    text: "review",
  },
];

export class RequestSegment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      searchParam: "rating",
      value: "5",
      format: "json",
      buttonColor: "blue",
      requestType: "GET",
    };

    this.handleRequest = this.handleRequest.bind(this);
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleFormatChange = (e, data) => {
    this.setState({
      format: data.value,
    });
  };

  handleSearchChange = (e, data) => {
    this.setState({
      searchParam: data.value,
    });
  };

  handleValueChange = (e, data) => {
    this.setState({
      value: data.value,
    });
  };

  async handleRequest() {
    this.setState({
      loading: true,
    });

    var request_data = await urlHelper.requestFactory(
      this.props.requestURL + this.state.searchParam,
      this.state.requestType,
      {
        format: this.state.format,
        value: this.state.value,
      },
      false,
      null
    );

    if (request_data.success === "success") {
      // the request has successful
      var formattedData = await formatHelper.formatterFactory(
        this.state.format,
        request_data.response
      );

      this.props.changeDataToParent(
        request_data.response,
        formattedData,
        this.state.format
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
              <Dropdown
                onChange={this.handleSearchChange}
                placeholder="What would you want to search by"
                selection
                options={searchBy}
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                onChange={this.handleValueChange}
                placeholder="Value to search by"
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
