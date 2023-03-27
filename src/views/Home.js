import { useSelector } from "react-redux";

export function Home() {
  const { text } = useSelector((store) => store.home);

  return <div>{text}</div>;
}
