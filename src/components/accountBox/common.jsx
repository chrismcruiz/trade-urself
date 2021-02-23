import styled from "styled-components";
import { motion } from "framer-motion";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 16px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const MutedLink = styled.a`
  font-size: 16px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 16px;
  color: rgb(0, 145, 62);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  font-size: 17px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(0, 165, 62);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(0, 145, 62);
  background: linear-gradient(
    58deg,
    rgba(0, 145, 62, 1) 20%,
    rgba(89, 169, 129, 1) 100%
  );
  &:hover {
    filter: brightness(1.03);
  }
`;

export const BoxContainer1 = styled.div`
  width: 600px;
  min-height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  margin: 30px 0px;
  // position: absolute;
  // transform: translate(-50%,-50%);
  // top: 50%;
  // left: 50%;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 285px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

export const BackDrop = styled(motion.div)`
  width: 160%;
  height: 535px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(-195deg);
  top: -290px;
  left: -70px;
  background: rgb(0, 145, 62);
  background: linear-gradient(
    58deg,
    rgba(0, 145, 62, 1) 20%,
    rgba(147, 220, 184, 1) 100%
  );
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 30px;
`;

export const HeaderText = styled.h2`
  font-size: 35px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

export const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

export const backdropVariants = {
  expanded: {
    width: "233%",
    height: "2000px",
    borderRadius: "20%",
    transform: "rotate(-10deg)",
  },
  collapsed: {
    width: "160%",
    height: "510px",
    borderRadius: "50%",
    transform: "rotate(-25deg)",
  },
};

export const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};
