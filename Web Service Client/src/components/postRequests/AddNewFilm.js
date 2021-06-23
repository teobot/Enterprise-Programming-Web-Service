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
      format: "json",
      buttonColor: "blue",
      requestType: "POST",
      year: null,
      title: null,
      director: null,
      stars: null,
      review: null,
      rating: null,
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
        title: "${this.state.title}",
        year: ${this.state.year},
        director: "${this.state.director}",
        stars: "${this.state.stars}",
        review: "${this.state.review}",
        rating: ${this.state.rating}\n}`;
    } else if (this.state.format === "xml") {
      return `<film>
      <title>${this.state.title}</title>
      <year>${this.state.year}</year>
      <director>${this.state.director}</director>
      <stars>${this.state.stars}</stars>
      <review>${this.state.review}</review>
      <rating>${this.state.rating}</rating>\n</film>`;
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
            title: this.state.title,
            year: this.state.year,
            director: this.state.director,
            stars: this.state.stars,
            review: this.state.review,
            rating: this.state.rating,
          })
        : this.handleDisplayFormat(),
      {
        "Content-Type": "application/" + this.state.format,
      }
    );

    request_data.response = { filmList: [request_data.response] };

    if (request_data.success === "success") {
      // the request has successful
      var formattedData = request_data.response.filmList;

      this.props.changeDataToParent(
        request_data.response.filmList,
        formattedData,
        "json"
      );

      this.setState({
        buttonColor: "green",
        loading: false,
        year: "",
        title: "",
        director: "",
        stars: "",
        review: "",
        rating: "",
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

        <Grid stretched columns="equal" stackable>
          <Grid.Column>
            <Form loading={this.state.loading}>
              <Form.Field required>
                <Form.Input
                  placeholder="Film Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field required>
                <Form.Input
                  placeholder="Film Year"
                  name="year"
                  type="number"
                  max={9999}
                  min={1000}
                  value={this.state.year}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field required>
                <Form.Input
                  placeholder="Film Director"
                  name="director"
                  value={this.state.director}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field required>
                <Form.Input
                  placeholder="Film Stars"
                  name="stars"
                  value={this.state.stars}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field required>
                <Form.Input
                  placeholder="Film Review"
                  name="review"
                  value={this.state.review}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field required>
                <Form.Input
                  placeholder="Film Rating"
                  name="rating"
                  type="number"
                  max={5}
                  min={0}
                  value={this.state.rating}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field required>
                <Dropdown
                  onChange={this.handleFormatChange}
                  placeholder="Select the sent format"
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
