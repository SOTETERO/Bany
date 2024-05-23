import PlayRacing from "./playRacing.js";
import { racings } from "./racing.js";

const UpdateRacings = async () => {
  racings.forEach((racing) => {
    PlayRacing(racing);
  });
};

export default UpdateRacings;
