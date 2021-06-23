import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Divider,
} from "semantic-ui-react";
import RequestDataDisplay from "../components/RequestDataDisplay";

// Request objects
import UpdateFilm from "../components/putRequests/UpdateFilm";
export class PutView extends Component {
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
          PUT
          <Header.Subheader>
            This data is returned from using PUT requests.
          </Header.Subheader>
        </Header>
        <Divider section />
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={[
            {
              menuItem: "Update Film Object",
              render: () => (
                <Tab.Pane attached={false}>
                  <UpdateFilm
                    requestTitle={"Update Film by Film Object"}
                    requestDescription={
                      "This function updates the given film below, The objects send to the server and dynamically created."
                    }
                    requestURL={"/update-film"}
                    changeDataToParent={this.changeDataToDisplay}
                  />
                </Tab.Pane>
              ),
            },
          ]}
        />

        <Divider hidden section />

        <Header as="h4">Request data</Header>
        <RequestDataDisplay dataToDisplay={this.state.dataToDisplay} />
      </Container>
    );
  }
}

export default PutView;
