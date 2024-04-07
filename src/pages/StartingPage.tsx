import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
	
  padding: 15px 30px;
  background-color: #fad312; 
  color: #191919;
  border: none;
  border-radius: 5px; 
  margin-top: 20px;
  cursor: pointer; 
  width: 100%; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2); /* 버튼에 그림자 효과 추가 */
	&:hover{
		background-color: #d0b134;
	}
`

const StartingPage = () => {

	const navigate = useNavigate();

	return (
		<>
			<StyledButton onClick={() => navigate('/login')}>
				로그인하기
			</StyledButton>
			<StyledButton onClick={() => navigate('/signUp')}>
				회원가입하기
			</StyledButton>
		</>
	)
}
export default StartingPage;
