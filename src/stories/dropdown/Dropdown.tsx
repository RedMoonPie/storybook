import { useState } from "react"
import styled from "styled-components";
import { keyframes } from 'styled-components'

export interface DropdownProps {
    list:string[]
    handleToggle?: () => void;
    open?: boolean;
}

const inAnimationList = keyframes`
    from{left:-100%;opacity:0}
    to{left:0;opacity:1}
`
const outAnimationList = keyframes`
    from{left:0;opacity:1}
    to{left:-100%;opacity:0}
`

const Button = styled.button<{ $primary?: boolean; }>`
  position: relative;
  font-size: 1.5em;
  text-align: center;
  border: none;
  padding: .3em .8em;
  margin: .5em;
  color: ${props => props.$primary ? "white" : "#BF4F74"};
  background-color: ${props => props.$primary ? "#BF4F74" : "white"};
  border-radius: 10px;
  -webkit-box-shadow: 0px 10px 32px 1px #bf4f7465;
  -moz-box-shadow: 0px 10px 32px 1px #bf4f7499;
  box-shadow: 0px 10px 32px 1px #bf4f7460;
  transition: all 100ms;


  &:hover{
    background-color: ${props => props.$primary ? "#bd416a" : "white"};
  }
  &:active{
    transform: translateY(3px) scale(0.95);
  }
`;

const UlList = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  flex-direction: column;
  list-style-type: none;
  align-items: center;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li<{ $open?: boolean; $index:number; }>`
    min-width: 5em;
    max-width: 10em;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    position: relative;
    border: 1px solid #bd416a;
    padding: .5em 2em;
    border-radius: .3em;
    opacity: ${props => props.$open ? 0: 1};;
    animation-name: ${props => props.$open ? inAnimationList: outAnimationList};
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0.23, 1, 0.320, 1);
    animation-delay: ${props => (props.$index * 1000) / 2 + "ms"};
    animation-fill-mode: forwards;
`; 
const Wrapper = styled.section`
    display: flex;
    position: relative;

    flex-direction: column;
    top: 0px;
    width: 500px;
    height: 500px;
`; 


export const DropDown = (props:DropdownProps):React.ReactElement => {

    const {list} = props

    const [toggle,setToggle] = useState(false)

      
    const handleToggleTmp = () => {
        setToggle(!toggle)
    }

    return (
        <Wrapper>
            <Button $primary onClick={handleToggleTmp}>
                Toggle List ! 
            </Button>
            { !!toggle &&
               <UlList>
                    {list.map((item:string, index:number) => (
                        <ListItem key={`${item}_${index}`} $open={toggle} $index={index}>
                            {item}
                        </ListItem>   
                    ))}
                </UlList>
            }
            

        </Wrapper>
    )

}