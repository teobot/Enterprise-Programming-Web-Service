import React, { Component } from "react";
import "../../css/index.css";
import {
  Header,
  Button,
  Segment,
  Form
} from "semantic-ui-react";
import urlHelper from "../../helpers/urlHelper";

export class RequestSegment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      buttonColor: "blue",
      requestType: "GET",
      id: null,
      displayRequestUrl: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  async handleRequest() {
    this.setState({
      loading: true,
    });

    var request_data = await urlHelper.requestFactory(
      this.props.requestURL + `?id=${this.state.id}`,
      this.state.requestType,
      {},
      {}
    );

    if (request_data.success === "success") {
      // the request has successful
      this.props.changeDataToParent(
        request_data.success,
        request_data.response
      );

      this.setState({
        buttonColor: "green",
        loading: false,
      });
    } else {
      // the request threw a error
      this.props.changeDataToParent(false, 0);

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

        <Form loading={this.state.loading}>
          <Form.Field>
            <Segment>{`${urlHelper.route_helper(this.props.requestURL)}?id=${
              this.state.id === null ? "placeholder" : this.state.id
            }`}</Segment>
          </Form.Field>

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

          <Button
            onClick={this.handleRequest}
            loading={this.state.loading}
            color={this.state.buttonColor}
          >
            send {this.state.requestType} request
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default RequestSegment;
