import { type Timer as TimerProps } from "../store/timers-context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer({ duration, name }: TimerProps) {
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
    </Container>
  );
}
