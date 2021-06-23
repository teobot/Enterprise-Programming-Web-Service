import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Divider,
  Segment,
} from "semantic-ui-react";

// Request objects
import DeleteFilmByObject from "../components/deleteRequests/DeleteFilmByObject";
import DeleteFilmById from "../components/deleteRequests/DeleteFilmById";

export class DeleteView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operationSuccess: false,
      deletedFilmId: null,
    };

    this.changeDataToDisplay = this.changeDataToDisplay.bind(this);
  }

  changeDataToDisplay = (operationSuccess, deletedFilmId) => {
    this.setState({
      operationSuccess: operationSuccess,
      deletedFilmId: deletedFilmId,
    });
  };

  render() {
    return (
      <Container fluid>
        <Header size="large">
          DELETE
          <Header.Subheader>
            This data is returned from using DELETE requests.
          </Header.Subheader>
        </Header>
        <Divider section />
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={[
            {
              menuItem: "Delete by Film Object",
              render: () => (
                <Tab.Pane attached={false}>
                  <DeleteFilmByObject
                    requestTitle={"Delete Film by Film Object"}
                    requestDescription={
                      "This functions deletes the given movie, the data can be send in either JSON or XML."
                    }
                    requestURL={"/delete-film"}
                    changeDataToParent={this.changeDataToDisplay}
                  />
                </Tab.Pane>
              ),
            },
            {
                menuItem: "Delete by Film Id",
                render: () => (
                  <Tab.Pane attached={false}>
                    <DeleteFilmById
                      requestTitle={"Delete Film by Film Id"}
                      requestDescription={
                        "In this function you send a film Id, instead of a film object. It then returns the film Id if the DELETE was successful."
                      }
                      requestURL={"/delete-film-by-id"}
                      changeDataToParent={this.changeDataToDisplay}
                    />
                  </Tab.Pane>
                ),
              }
          ]}
        />

        <Divider hidden section />

        <Header as="h4">Request data</Header>
        <Segment padded color={this.state.deletedFilmId === null ? "yellow" : this.state.operationSuccess ? "green" : "red"}>
          <Header size="medium">{this.state.deletedFilmId === null ? "Waiting for request response!" : this.state.operationSuccess ? `Operation success, film ${this.state.deletedFilmId} deleted!` : "Operation failed!"}</Header>
        </Segment>
      </Container>
    );
  }
}

export default DeleteView;
