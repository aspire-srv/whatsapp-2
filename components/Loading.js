import { Circle } from "better-react-spinkit";
import Image from "next/image";

function Loading () {
  return (

    <center style={{display:"grid", placeItems: "center", height: "100vh" }}>
    <div>
    <Image
    src="https://i.pinimg.com/originals/79/dc/31/79dc31280371b8ffbe56ec656418e122.png"
    // style={{ marginBottom: 10 }}
    height= {200}
    />
    <Circle color="#3CBC29" size={60} />
    </div>
    </center>

  )
}

export default Loading;
