import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

//사이즈, 배경색상, 글자, 보더
const StButton = styled.button`
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

const buttonList = ["Large Primary Button", "Medium", "Small"];
const negativeButtonList = ["Large Negative Button", "NMedium", "NSmall"];

const getButtonColor = (name) => {
  switch (name) {
    case "Large Primary Button":
      return { style: { border: "3px solid rgb(85, 239, 196)", width: "300px", height: "50px" }, backgroundColor: "white" };
    case "Medium":
      return { style: { border: "none", width: "150px", height: "50px" }, backgroundColor: "rgb(85, 239, 196)" };
    case "Small":
      return { style: { border: "none", width: "100px", height: "45px" }, backgroundColor: "rgb(85, 239, 196)" };
    case "Large Negative Button":
      return { style: { border: "3px solid rgb(250, 177, 160)", width: "300px", height: "50px" }, backgroundColor: "white" };
    case "NMedium":
      return { name: "Medium", style: { border: "none", width: "150px", height: "50px" }, backgroundColor: "rgb(250, 177, 160)" };
    case "NSmall":
      return { name: "Small", style: { border: "none", width: "100px", height: "45px" }, backgroundColor: "rgb(250, 177, 160)" };
  }
};

function App() {
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div>
      <h1>Button</h1>
      {buttonList.map((name) => {
        if (name == "Large Primary Button") {
          // console.log(getButtonColor(name).backgroundColor);
          return (
            <StButton
              onClick={() => {
                alert("버튼을 만들어 보세요");
              }}
              color={getButtonColor(name).backgroundColor}
              style={getButtonColor(name).style}>
              {name}
            </StButton>
          );
        }
        return (
          <StButton color={getButtonColor(name).backgroundColor} style={getButtonColor(name).style}>
            {name}
          </StButton>
        );
      })}
      {negativeButtonList.map((name) => {
        if (name == "Large Negative Button") {
          // console.log(getButtonColor(name).backgroundColor);
          return (
            <StButton
              onClick={() => {
                prompt("어렵나요?");
              }}
              color={getButtonColor(name).backgroundColor}
              style={getButtonColor(name).style}>
              {name}
            </StButton>
          );
        }
        return (
          <StButton color={getButtonColor(name).backgroundColor} style={getButtonColor(name).style}>
            {getButtonColor(name).name}
          </StButton>
        );
      })}
      <h1>Input</h1>
      <form>
        <label>이름</label>
        <input value={name} onChange={(event) => setName(event.target.value)} />
        <label>가격</label>
        <input
          value={price}
          onChange={(event) => {
            let value = event.target.value;
            const numCheck = /^[0-9,]/.test(value);
            if (!numCheck && value) {
              alert("숫자를 입력하세요");
              return;
            }
            if (numCheck) {
              const numValue = value.replaceAll(",", "");
              value = numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            setPrice(value);
          }}
        />
        <StButton
          color={getButtonColor("Small").backgroundColor}
          style={getButtonColor("Small").style}
          onClick={(event) => {
            event.preventDefault();
            alert(`{name : ${name}, price : ${price.replaceAll(",", "")}}`);
          }}>
          저장
        </StButton>
      </form>
      <h1>Modal</h1>
      <StButton color={getButtonColor("Medium").backgroundColor} style={getButtonColor("Medium").style} onClick={() => setModal(!modal)}>
        open modal
      </StButton>
      {modal ? <Modal modal={modal} setModal={setModal} /> : null}
      <StButton onClick={() => setModalTwo(!modalTwo)} color={getButtonColor("Large Negative Button").backgroundColor} style={getButtonColor("Large Negative Button").style}>
        open modal
      </StButton>
      {modalTwo ? <ModalTwo modalTwo={modalTwo} setModalTwo={setModalTwo} /> : null}
      <div className='select-container'>
        <h1>Select</h1>
        <select>
          <option>리액트</option>
          <option>자바</option>
          <option>스프링</option>
          <option>리액트네이티브</option>
        </select>
        <select className='slect-two'>
          <option>리액트</option>
          <option>자바</option>
          <option>스프링</option>
          <option>리액트네이티브</option>
        </select>
      </div>
    </div>
  );
}

const Modal = ({ setModal, modal }) => {
  return (
    <div className='modal-background'>
      <div className='modal-box'>
        <p>닫기와 확인 버튼 2개가 있고, 외부 영역을 눌러도 모달이 닫히지 않아요.</p>
        <div className='buttons'>
          <StButton color={getButtonColor("NSmall").backgroundColor} style={getButtonColor("NSmall").style} onClick={() => setModal(!modal)}>
            닫기
          </StButton>
          <StButton color={getButtonColor("Small").backgroundColor} style={getButtonColor("Small").style}>
            확인
          </StButton>
        </div>
      </div>
    </div>
  );
};

const ModalTwo = ({ setModalTwo, modalTwo }) => {
  return (
    <div
      className='modal-background'
      onClick={(event) => {
        if (event.target.className !== "modal-box") {
          setModalTwo(!modalTwo);
        }
      }}>
      <div className='modal-box'>
        <p>닫기 ~~!~</p>
        <button onClick={() => setModalTwo(!modalTwo)}>X</button>
      </div>
    </div>
  );
};

export default App;
