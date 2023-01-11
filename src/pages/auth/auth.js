import { selectError } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Container, Alert } from 'react-bootstrap';
import { Auth } from '../../features/auth/Auth';

export function AuthPageHeader() {
    return null;
}

export function AuthPageBody() {
    const error = useSelector(selectError);

    return (
        <Container>
            {error ? <Alert variant="danger">{error}</Alert> : null}
            <Auth />
        </Container>
    );
}
