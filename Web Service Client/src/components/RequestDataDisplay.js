import React, { Component } from "react";
import { Tab, Segment, TextArea } from "semantic-ui-react";
import FilmRow from "./FilmRow";
import "../css/index.css";
import formatHelper from "../helpers/formatHelper";
export class RequestDataDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.rawDataToString = this.rawDataToString.bind(this);
  }

  rawDataToString() {
    const format = this.props.dataToDisplay.format;
    if (format === "") {
      return "The raw request data will appear here once a request has been made.";
    } else if (format === "xml") {
      return formatHelper.XMLToString(this.props.dataToDisplay.rawData);
    } else if (format === "json") {
      return JSON.stringify(this.props.dataToDisplay.rawData);
    } else {
      return this.props.dataToDisplay.rawData;
    }
  }

  render() {
    return (
      <Tab
        panes={[
          {
            menuItem: "Formatted",
            render: () => (
              <Tab.Pane>
                <Segment.Group>
                  {this.props.dataToDisplay.formattedData.length < 1 || this.props.dataToDisplay.formattedData === undefined ? (
                    <Segment>Waiting for the user to make a request!</Segment>
                  ) : (
                    this.props.dataToDisplay.formattedData.map(
                      (film, index) => (
                        <FilmRow
                          filmData={film}
                          key={film.id * index}
                          index={index}
                        />
                      )
                    )
                  )}
                </Segment.Group>
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Raw",
            render: () => (
              <Tab.Pane>
                <TextArea
                  className="w-100"
                  rows={this.rawDataToString().length / 150}
                  value={this.rawDataToString()}
                />
              </Tab.Pane>
            ),
          },
        ]}
      />
    );
  }
}

export default RequestDataDisplay;
