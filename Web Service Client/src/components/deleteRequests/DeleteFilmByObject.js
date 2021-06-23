import React, { Component } from "react";
import "../../css/index.css";
import {
  Header,
  Button,
  Dropdown,
  Segment,
  Form,
  Grid,
  TextArea
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
      format: formatOptions[0].value,
      buttonColor: "blue",
      requestType: "DELETE",
      id: null,
    };

    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleDisplayFormat = this.handleDisplayFormat.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleFormatChange = (e, data) => {
    this.setState({
      format: data.value,
    });
  };

  handleDisplayFormat = () => {
    if (this.state.format === "json") {
      return `{
        id: ${this.state.id},\n}`;
    } else if (this.state.format === "xml") {
      return `<film>
      <id>${this.state.id}</id>\n</film>`;
    }
  };

  async handleRequest() {
    this.setState({
      loading: true,
    });

    var request_data = await urlHelper.requestFactory(
      this.props.requestURL,
      this.state.requestType,
      this.state.format === "json"
        ? JSON.stringify({
            id: this.state.id,
          })
        : this.handleDisplayFormat(),
      {
        Accept: "application/" + this.state.format,
        "Content-Type": "application/" + this.state.format,
      }
    );

    if (request_data.success === "success") {
      // the request has successful

      this.props.changeDataToParent(
        request_data.success,
        this.state.format === "json" ? request_data.response.id : request_data.response.lastChild.childNodes[0].textContent
      );

      this.setState({
        buttonColor: "green",
        loading: false,
        id: "",
      });
    } else {
      // the request threw a error
      this.props.changeDataToParent(
        false,
        0
      );

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

        <Grid stretched columns="equal" stackable>
          <Grid.Column>
            <Form loading={this.state.loading}>
              <Form.Field required>
                <Form.Input
                  placeholder="Film Id"
                  name="id"
                  type="number"
                  max={99999999}
                  min={0}
                  value={this.state.id}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field required>
                <Dropdown
                  onChange={this.handleFormatChange}
                  placeholder="Select the return format"
                  selection
                  options={formatOptions}
                />
              </Form.Field>

              <Button
                onClick={this.handleRequest}
                loading={this.state.loading}
                color={this.state.buttonColor}
              >
                send {this.state.requestType} request
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <TextArea disabled value={this.handleDisplayFormat()} />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default RequestSegment;
