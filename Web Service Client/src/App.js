import "./css/App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Segment,
  Header,
  Divider,
  Tab,
  Image,
  Flag,
  Grid,
  Icon,
} from "semantic-ui-react";
import sig from "./img/sig.png";

// Get Views
import GetView from "./views/GetView";
import PostView from "./views/PostView";
import DeleteView from "./views/DeleteView";
import PutView from "./views/PutView";

const version = "1.10";

function App() {
  const routes = [
    {
      menuItem: "GET",
      render: () => (
        <Tab.Pane attached={false}>
          <GetView />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "POST",
      render: () => (
        <Tab.Pane attached={false}>
          <PostView />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "DELETE",
      render: () => (
        <Tab.Pane attached={false}>
          <DeleteView />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "PUT",
      render: () => (
        <Tab.Pane attached={false}>
          <PutView />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Container fluid className="App">
      <Segment basic>
        <Grid verticalAlign="middle" padded relaxed>
          <Image src={sig} size="small" style={{ maxHeight: 151 }} />
          <Flag name="gb" />
        </Grid>
      </Segment>
      <Divider hidden section />
      <Container>
        <Header as="h2">
          <Icon name="world" />
          <Header.Content>
            Welcome, this is my <u>enterprise react front end.</u>{" "}
            <small className="version-text"> - v.{version}</small>
            <Header.Subheader>
              Made by <i>Theo Jed Barber Clapperton</i>
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Divider section />
        <Tab menu={{ pointing: true }} panes={routes} />
      </Container>
      <Divider section hidden />
    </Container>
  );
}

export default App;
