import { useNavigate } from 'react-router-dom';
import {Layout, Typography, Row, Col, Button} from 'antd';
import { useMediaQuery } from 'react-responsive';
const {Header} = Layout;
const {Title} = Typography;

const NavbarHeader = () => {
    const mobileVersion = useMediaQuery({ maxWidth: 767})
    const navigate = useNavigate();
    return (

    <Header style={{backgroundColor: '#f0f2f5'}}>
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Title onClick={() => navigate('/')} level={!mobileVersion ? 2 : 5} style={{padding: 5, cursor: 'pointer'}}>SEJ Demo</Title>
            </Col>
            <Col span={12}>
                <Button onClick={() => navigate('/bookmarks')} type="primary" style={{float: 'right', margin: 10}}>
                   Bookmark List
                </Button>
            </Col>
        </Row>
    </Header>
    )
}

export default NavbarHeader;