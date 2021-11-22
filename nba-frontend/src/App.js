import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import InputGroup from "react-bootstrap/InputGroup";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState ,useEffect} from "react";
import axios from "axios";

function App() {
  const [searchInput, setSearchInput] = useState();
  const [playersBySearch, setPlayersBySearch] = useState();
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/players`)
      .then(function (response) {
        setFavoritePlayers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])



  function changeHandler(event) {
    setSearchInput(event.target.value);
  }

  function showPlayers() {
    axios
      .get(`https://www.balldontlie.io/api/v1/players/?search=${searchInput}`)
      .then(function (response) {
        setPlayersBySearch(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addToFavorite(event) {
    let playerid = playersBySearch[event.target.name].id;

    if(!favoritePlayers.find((player)=>player.playerid===playerid)){
      let first_name = playersBySearch[event.target.name].first_name;
      let last_name = playersBySearch[event.target.name].last_name;
      let team = playersBySearch[event.target.name].team.full_name;
      axios
        .post(`http://localhost:5000/players`, {
          playerid,
          first_name,
          last_name,
          team
        })
        .then(function (response) {
          favoritePlayers.push(response.data)
          setFavoritePlayers(prev=>([...favoritePlayers]));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }



  return (
    <div>
      <header className="p-3 mb-2 bg-info text-dark text-center">
        <h1>NBA search</h1>
      </header>
      <section className="container d-flex justify-content-center w-25">
        <InputGroup>
          <Form.Control
            placeholder="search"
            onChange={(event) => changeHandler(event)}
          />
          <Button variant="warning" onClick={() => showPlayers()}>
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
      </section>
      <section>
        <div className="container mt-5">
          <div className="row text-center">
            <div className="col border">
              <h2 className="mb-4">Search List</h2>
              <Row xs={1} md={2} className="g-3">
                {playersBySearch &&
                  playersBySearch.slice(0, 10).map((player, idx) => (
                    <Col
                      key={player.id}
                      className="d-flex justify-content-center"
                    >
                      <Card
                        style={{ width: "16rem" }}
                        className="mb-2"
                        bg="light"
                      >
                        <Card.Header>
                          {player.first_name.toLowerCase() ===
                          searchInput.toLowerCase() ? (
                            <mark>{player.first_name}</mark>
                          ) : (
                            player.first_name
                          )}
                          &nbsp;
                          {player.last_name.toLowerCase() ===
                          searchInput.toLowerCase() ? (
                            <mark>{player.last_name}</mark>
                          ) : (
                            player.last_name
                          )}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>Team: {player.team.full_name}</Card.Text>
                          <Button
                            name={idx}
                            variant="danger"
                            onClick={(event) => addToFavorite(event)}
                          >
                            add to favorite{" "}
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
            <div className="col border">
              <h2>Favorite List</h2>
              <Row xs={1} md={2} className="g-3">
                {favoritePlayers &&
                  favoritePlayers.map((player) => (
                    <Col
                      key={player.playerid}
                      className="d-flex justify-content-center"
                    >
                      <Card
                        style={{ width: "16rem" }}
                        className="mb-2"
                        bg="light"
                      >
                        <Card.Header>
                            {player.first_name} {player.last_name}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>Team: {player.team}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
