import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Divider,
} from "semantic-ui-react";
import RequestDataDisplay from "../components/RequestDataDisplay";

// Request objects
import AddNewFilm from "../components/postRequests/AddNewFilm";
import AddNewFilmSimple from "../components/postRequests/AddNewFilmSimple"

export class PostView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataToDisplay: { rawData: [], formattedData: [], format: "" },
    };

    this.changeDataToDisplay = this.changeDataToDisplay.bind(this);
  }

  changeDataToDisplay = (rawData, formattedData, format) => {
    this.setState({
      dataToDisplay: {
        rawData: rawData,
        formattedData: formattedData,
        format: format,
      },
    });
  };

  render() {
    return (
      <Container fluid>
        <Header size="large">
          POST
          <Header.Subheader>
            This data is returned from using POST requests.
          </Header.Subheader>
        </Header>
        <Divider section />
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={[
            {
              menuItem: "Add new film",
              render: () => (
                <Tab.Pane attached={false}>
                  <AddNewFilm
                    requestTitle={"Add a new film"}
                    requestDescription={
                      "This function posts a new film to the database, It can accept the data in either JSON or XML."
                    }
                    requestURL={"/add-film"}
                    changeDataToParent={this.changeDataToDisplay}
                  />
                </Tab.Pane>
              ),
            },
            {
              menuItem: "Add new film SimpleHTTP",
              render: () => (
                <Tab.Pane attached={false}>
                  <AddNewFilmSimple
                    requestTitle={"Add a new film SimpleHTTP"}
                    requestDescription={
                      "This function posts a new film to the database, using simple HTTP requests, It can accept the data in either JSON or XML."
                    }
                    requestURL={"/add-film-simpleHttp"}
                    changeDataToParent={this.changeDataToDisplay}
                  />
                </Tab.Pane>
              ),
            }
          ]}
        />

        <Divider hidden section />

        <Header as="h4">Request data</Header>
        <RequestDataDisplay dataToDisplay={this.state.dataToDisplay} />
      </Container>
    );
  }
}

export default PostView;
