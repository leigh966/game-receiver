var cards;

export default function Blackjack(props) {
  cards = props.startingCards;
  return (
    <>
      <img src={`./cards/${cards[0]}.png`} width={"30%"} />
      <img src={`./cards/${cards[1]}.png`} width={"30%"} />
    </>
  );
}
