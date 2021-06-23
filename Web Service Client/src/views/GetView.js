import React, { Component } from "react";
import { Container, Header, Tab, Divider } from "semantic-ui-react";
import RequestDataDisplay from "../components/RequestDataDisplay";

// Request objects
import GetAllFilmsFormat from "../components/getRequests/GetAllFilmsFormat";
import GetFilmsByName from "../components/getRequests/GetFilmsByName";
import GetFilmsBySearch from "../components/getRequests/GetFilmsBySearch";
import GetFilmById from "../components/getRequests/GetFilmById";

import "../css/App.css"
export class GetView extends Component {
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
          GET
          <Header.Subheader>
            This data is returned from using GET requests.
          </Header.Subheader>
        </Header>
        <Divider section />

        <Container fluid>
          <Tab
            menu={{ className: "wrapped", attached: false, secondary: true, pointing: true }}
            panes={[
              {
                menuItem: "All Films",
                render: () => (
                  <Tab.Pane>
                    <GetAllFilmsFormat 
                      requestTitle={"Get all films by format"}
                      requestDescription={
                        "This function returns a filmList of films, It accepts a format string, this can be either JSON, XML or TEXT, this then changes the return type."
                      }
                      requestURL={"/retrieve/get-all-films-format"}
                      changeDataToParent={this.changeDataToDisplay}
                    />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: "Films by name",
                render: () => (
                  <Tab.Pane>
                    <GetFilmsByName
                      requestTitle={"Get films by name"}
                      requestDescription={
                        "This function returns films based on the title, it can then return JSON, XML."
                      }
                      requestURL={"/retrieve/get-films-by-name"}
                      changeDataToParent={this.changeDataToDisplay}
                    />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: "Films by search",
                render: () => (
                  <Tab.Pane>
                    <GetFilmsBySearch
                      requestTitle={"Get films by search"}
                      requestDescription={
                        "This function allows for the user to search for films based on the film parameter."
                      }
                      requestURL={"/retrieve/search-films/"}
                      changeDataToParent={this.changeDataToDisplay}
                    />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: "Film by Id",
                render: () => (
                  <Tab.Pane>
                    <GetFilmById
                      requestTitle={"Get film by Id"}
                      requestDescription={
                        "This function returns a single film based on the given Id."
                      }
                      requestURL={"/retrieve/film/"}
                      changeDataToParent={this.changeDataToDisplay}
                    />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </Container>

        <Divider hidden section />

        <Header as="h4">Request data</Header>
        <RequestDataDisplay dataToDisplay={this.state.dataToDisplay} />
      </Container>
    );
  }
}

export default GetView;
