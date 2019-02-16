import React from 'react'
import styled from 'styled-components'
import sparkle from './assets/sparkle.png'

const App = () => (
  <AppStyled>
    <SparkleImg src={sparkle} />
    <TitleText>Crypto Flash</TitleText>
  </AppStyled>
)

const AppStyled = styled.div`
  
`

const TitleText = styled.span`
  padding-left: 15px;
  top: -16px;
  position: relative;
  font-size: 28px;
`

const SparkleImg = styled.img`
  width: 50px;
`

export default App