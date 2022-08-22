import { LoginForm } from "../components/Forms/LogInForm/LogInForm";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/signup");
	};
	return (
		<>
			<Container as={Row}>
				<Col>
					<LoginForm />
				</Col>
				<Col xs={1}>
					<Divider layout="vertical" className="p-divider-vertical">
						<b>Or</b>
					</Divider>
				</Col>
				<Col>
					<Button onClick={handleClick}>Sign Up</Button>
				</Col>
			</Container>
		</>
	);
}
