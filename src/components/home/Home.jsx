import React from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
import Price from "./price/Price"
import Recent from "./recent/Recent"
import Team from "./team/Team"
import AwardsList from "./awards/AwardsList"
import RealEstateCRUD from "./recent/RealEstateCRUD"

import Commande from "../commande/Commande"

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <RealEstateCRUD/>
      <Recent />
      <Awards />
      <AwardsList/>
      <Location />
      <Commande/>
      <Team />
    
      <Price />
    </>
  )
}

export default Home
