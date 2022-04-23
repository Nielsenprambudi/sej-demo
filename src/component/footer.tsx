import {Layout, Typography} from 'antd';
const {Footer} = Layout;
const {Paragraph} = Typography;

const FooterLayout = () => {
    return (
        <Footer>
            <Paragraph style={{textAlign: 'center', fontStyle: 'italic'}}>
                Made by Nielsen Prambudi
            </Paragraph>
        </Footer>
    )
}

export default FooterLayout;