import React, { Component } from "react";
import "../../css/index.css";
import {
  Header,
  Button,
  Dropdown,
  Segment,
  Input,
  Form,
  Grid,
  TextArea,
  Divider,
  Rating,
  Dimmer,
  Image,
} from "semantic-ui-react";
import urlHelper from "../../helpers/urlHelper";
import shortParagraph from "../../img/short-paragraph.png"
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
      requestType: "PUT",
      id: 10001,
      filmToEdit: null,
      title: null,
      year: null,
      director: null,
      stars: null,
      review: null,
      rating: null,
      fileToEditError: false,
      getFilmToBeUpdateLoading: false,
    };

    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleDisplayFormat = this.handleDisplayFormat.bind(this);
    this.getFilmToBeEdited = this.getFilmToBeEdited.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.getMovieById = this.getMovieById.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleFormatChange = (e, data) => {
    this.setState({
      format: data.value,
    });
  };

  handleDisplayFormat = () => {
    if (this.state.filmToEdit === null) {
      return "Waiting for Film!";
    }
    if (this.state.format === "json") {
      var jsonString = "{\n\tid: " + this.state.id + ",\n";

      jsonString +=
        this.state.title !== this.state.filmToEdit.title
          ? `\ttitle: "${this.state.title}",\n`
          : "";
      jsonString +=
        this.state.year !== this.state.filmToEdit.year
          ? `\tyear: ${this.state.year},\n`
          : "";
      jsonString +=
        this.state.director !== this.state.filmToEdit.director
          ? `\tdirector: "${this.state.director}",\n`
          : "";
      jsonString +=
        this.state.stars !== this.state.filmToEdit.stars
          ? `\tstars: "${this.state.stars}",\n`
          : "";
      jsonString +=
        this.state.review !== this.state.filmToEdit.review
          ? `\treview: "${this.state.review}",\n`
          : "";
      jsonString +=
        this.state.rating !== this.state.filmToEdit.rating
          ? `\trating: ${this.state.rating},\n`
          : "";

      jsonString += "}";
      return jsonString;
    } else if (this.state.format === "xml") {
      var xmlString = "<film>\n\t<id>" + this.state.id + "</id>\n";

      xmlString +=
        this.state.title !== this.state.filmToEdit.title
          ? `\t<title>${this.state.title}</title>\n`
          : "";

      xmlString +=
        this.state.year !== this.state.filmToEdit.year
          ? `\t<year>${this.state.year}</year>\n`
          : "";

      xmlString +=
        this.state.director !== this.state.filmToEdit.director
          ? `\t<director>${this.state.director}</director>\n`
          : "";

      xmlString +=
        this.state.stars !== this.state.filmToEdit.stars
          ? `\t<stars>${this.state.stars}</stars>\n`
          : "";

      xmlString +=
        this.state.review !== this.state.filmToEdit.review
          ? `\t<review>${this.state.review}</review>\n`
          : "";

      xmlString +=
        this.state.rating !== this.state.filmToEdit.rating
          ? `\t<rating>${this.state.rating}</rating>\n`
          : "";

      xmlString += "</film>";
      return xmlString;
    }
  };

  handleRate = (e, { rating, maxRating }) => {
    this.setState({
      rating: rating,
    });
  };

  async getFilmToBeEdited() {
    this.setState({
      getFilmToBeUpdateLoading: true,
      fileToEditError: false,
    });
    var film_to_update = await urlHelper.requestFactory(
      "/retrieve/film/" + this.state.id,
      "GET",
      {},
      false,
      {}
    );

    if (
      film_to_update.success === "success" &&
      film_to_update.response !== ""
    ) {
      const film = film_to_update.response;
      this.setState({
        filmToEdit: film,
        title: film.title,
        year: film.year,
        director: film.director,
        stars: film.stars,
        review: film.review,
        rating: film.rating,
      });
    } else {
      // Error getting film to edit
      this.setState({
        fileToEditError: true,
      });
    }

    this.setState({
      getFilmToBeUpdateLoading: false,
    });
  }

  async getMovieById() {
    var get_request_data = await urlHelper.requestFactory(
      "/retrieve/film/" + this.state.id,
      "GET",
      {},
      false,
      {
        Accept: "application/json",
      }
    );

    get_request_data.response = { filmList: [get_request_data.response] };

    if (get_request_data.success === "success") {
      // the request has successful
      var formattedData = get_request_data.response.filmList;

      this.props.changeDataToParent(
        get_request_data.response.filmList,
        formattedData,
        "json"
      );

      this.setState({
        buttonColor: "green",
        loading: false,
      });

      await this.getFilmToBeEdited();
    } else {
      // the request threw a error
      this.setState({
        buttonColor: "red",
        loading: false,
      });
    }
  }

  async handleRequest() {
    this.setState({
      loading: true,
    });
    var jsonObject = {};

    if (this.state.format === "json") {
      jsonObject["id"] = this.state.id;
      if (this.state.title !== this.state.filmToEdit.title)
        jsonObject["title"] = this.state.title;
      if (this.state.year !== this.state.filmToEdit.year)
        jsonObject["year"] = this.state.year;
      if (this.state.director !== this.state.filmToEdit.director)
        jsonObject["director"] = this.state.director;
      if (this.state.stars !== this.state.filmToEdit.stars)
        jsonObject["stars"] = this.state.stars;
      if (this.state.review !== this.state.filmToEdit.review)
        jsonObject["review"] = this.state.review;
      if (this.state.rating !== this.state.filmToEdit.rating)
        jsonObject["rating"] = this.state.rating;
    }

    var request_data = await urlHelper.requestFactory(
      this.props.requestURL,
      this.state.requestType,
      this.state.format === "json"
        ? JSON.stringify(jsonObject)
        : this.handleDisplayFormat(),
      {
        Accept: "application/" + this.state.format,
        "Content-Type": "application/" + this.state.format,
      }
    );

    if (request_data.success === "success") {
      // the request has successful
      await this.getMovieById();
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

        <Form loading={this.state.getFilmToBeUpdateLoading}>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Type a Film Id for updating"
              name="id"
              value={this.state.id}
              type="number"
              min={0}
              error={this.state.fileToEditError}
              max={99999999}
              onChange={this.handleChange}
            />
            <Form.Button
              floated="right"
              onClick={this.getFilmToBeEdited}
              loading={this.state.getFilmToBeUpdateLoading}
              color={this.state.buttonColor}
              content="Get Film"
            />
          </Form.Group>
        </Form>

        <Divider hidden />

        {/* This is the film card that can be edited */}
        {this.state.title === null ? (
          <Segment>
            <Dimmer active />
            <Image src={shortParagraph} />
            <Image src={shortParagraph} />
            <Image src={shortParagraph} />
          </Segment>
        ) : (
          <Segment>
            <Grid stackable centered doubling textAlign="center">
              <Grid.Row columns="equal">
                <Grid.Column width={10}>
                  <Input
                    label="Title:"
                    fluid
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Input
                    label="Director:"
                    name="director"
                    fluid
                    value={this.state.director}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
                <Grid.Column width={2} verticalAlign="middle">
                  <Rating
                    icon="star"
                    defaultRating={this.state.rating}
                    onRate={this.handleRate}
                    maxRating={5}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column>
                  <Input
                    label="Year:"
                    name="year"
                    type="number"
                    min={1000}
                    max={9999}
                    value={this.state.year}
                    onChange={this.handleChange}
                  />
                  <small> - {this.state.id}</small>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column>
                  <Input
                    fluid
                    label="Stars:"
                    name="stars"
                    value={this.state.stars}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column>
                  <TextArea
                    rows={this.state.review.length / 75}
                    className="w-100"
                    name="review"
                    value={this.state.review}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}

        <Divider hidden />

        <Form>
          <Form.Field>
            <Dropdown
              onChange={this.handleFormatChange}
              placeholder="Select the return format"
              selection
              options={formatOptions}
            />
          </Form.Field>
          <Form.Field>
            <TextArea
              rows={this.handleDisplayFormat().split("\n").length}
              value={this.handleDisplayFormat()}
            />
          </Form.Field>
        </Form>

        <Segment basic>
          <Button
            onClick={this.handleRequest}
            loading={this.state.loading}
            color={this.state.buttonColor}
            content="Update Film"
            floated="right"
          />
        </Segment>
      </Segment>
    );
  }
}

export default RequestSegment;
