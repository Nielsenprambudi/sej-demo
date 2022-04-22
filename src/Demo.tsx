import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCategories, getBooks} from './storing/actions/category';
import {Layout, Typography, Row, Col, Input, Select, Table, Divider} from 'antd';
const {Header, Footer, Content} = Layout;
const {Title, Paragraph} = Typography;
const {Search} = Input;
const {Option} = Select;

const Demo = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const {isLoadingCat, isCat, 
    isErrorCat, cats,
    isLoadingBook, isBook,
    isErrorBook, books
  } = useSelector((state: any) => state.config);
  const [selectCat, setSelectCat] = useState('');
  const [idCat, setIdCat] = useState('');
  const columns = [
    {
      title: 'Number',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <div>{id + 1}</div>
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    }
  ]

  const searchingBook = (e: string) => {
    setSearch(e);
  };

  const onChangeCat = (val: string) => {
    const parsing = JSON.parse(val);
    setSelectCat(parsing.name);
    setIdCat(parsing.id);
    dispatch(getBooks({
      catId: parsing.id,
      page: 0,
      size: 10
    }))
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
      <Layout >
        <Header>
          <Title style={{color: '#FFFFFF'}}>SEJ Demo</Title>
        </Header>
        <Layout className='layoutwrapper'>
          <Content>
            <div className='layoutcontent'>
              <Row gutter={[16, 16]}>
                <Col className='gutter-row' xs={24} sm={24} md={12} lg={12}>
                  <Search 
                    placeholder='Search by Author or Title of the books' 
                    value={search} 
                    onChange={(e) => searchingBook(e.target.value)}
                    enterButton
                  />
                </Col>
                <Col className='gutter-row' xs={24} sm={24} md={12} lg={12}>
                  <Select value={selectCat} style={{width: '100%'}} onChange={onChangeCat}  placeholder="Select Category" loading={isLoadingCat}>
                    {
                      isCat &&
                      cats.map((item: any, i: number) => (
                        <Option value={JSON.stringify(item)}>{item?.name}</Option>
                      ))
                    }
                  </Select>
                </Col>
              </Row>
              <Divider/>
              <Table
                columns={columns}
                dataSource={books}
                loading={isLoadingBook}              
              />
            </div>
          </Content>
        </Layout>
        <Footer>
          <Paragraph style={{textAlign: 'center', fontStyle: 'italic'}}>
            Made by Nielsen Prambudi
          </Paragraph>
        </Footer>
      </Layout>
  );
}

export default Demo;
