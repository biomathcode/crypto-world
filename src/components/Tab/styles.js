import styled from "styled-components";



export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 170px;
  height: 100px;
  transition: border 100ms ease-in ;
  border-bottom:${props => props.active ? `6px solid #8F80BA` : null }  ;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: white;
  color: #8F80BA;
  font-family: Raleway;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 21px;
letter-spacing: 0.015em;
text-align: left;
  
`;

export const SubContainer = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-evenly;
 padding: 10px;
 color:  #452A7A;
font-size: 1.5rem;
font-style: normal;
font-weight: 600;
line-height: 56px;
letter-spacing: 0.085em;
text-align: left;

    .anticon {
        position: relative;
        margin-top: 15px;
    }
    
`

