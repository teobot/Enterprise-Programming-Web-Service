import React, { Component } from "react";
import {
  Segment,
  Container,
  Header,
  Rating,
  Grid,
  Label
} from "semantic-ui-react";

import Fade from "react-reveal/Fade";

import "../css/index.css";

export class FilmRow extends Component {
  render() {
    return (
      <Fade bottom key={this.props.filmData.id}>
        <Segment>
          <Grid columns="equal">
            <Grid.Column>
              <Header as="h3" className="roboto">
                {this.props.filmData.title}
                <Header.Subheader>
                  ({this.props.filmData.year})<small> - {this.props.filmData.id}</small>
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Label as="a" basic>
                Directed by {this.props.filmData.director.toLocaleLowerCase()}
              </Label>
              <Rating
                disabled
                floated="right"
                icon="star"
                defaultRating={this.props.filmData.rating}
                maxRating={5}
              />
            </Grid.Column>
          </Grid>
          <Container className="container-mbt-1" fluid>
            {this.props.filmData.stars.split(",").map((name) => (
              <Label as="a" basic image>
                <img
                  alt={`${name.toLocaleLowerCase()}`}
                  src={`https://react.semantic-ui.com/images/avatar/small/${
                    ["joe", "stevie", "elliot"][Math.floor(Math.random() * 3)]
                  }.jpg`}
                />
                {name}
              </Label>
            ))}
          </Container>
          <p>{this.props.filmData.review}</p>
        </Segment>
      </Fade>
    );
  }
}

export default FilmRow;
