import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCategories, getBooks} from './storing/actions/category';
import {Layout, Typography, Row, Col, 
  Input, Select, Table, Divider,
  Image, Button
} from 'antd';
import ReactModal from 'react-modal';
import { UnorderedListOutlined } from '@ant-design/icons'; 
const {Header, Footer, Content} = Layout;
const {Title, Paragraph, Text} = Typography;
const {Search} = Input;
const {Option} = Select;

type detailbook = {
  title?: string,
  authors?: any,
  cover_url?: string,
  description?: string,
  sections?: any
}

const Demo = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const {isLoadingCat, isCat, 
    isErrorCat, cats,
    isLoadingBook, isBook,
    isErrorBook, books,
    size, page
  } = useSelector((state: any) => state.config);
  const [selectCat, setSelectCat] = useState('');
  const [idCat, setIdCat] = useState('');
  const [detail, setDetail] = useState({} as detailbook);
  const [open, setOpen] = useState(false);
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
    },
    {
      title: 'Covers',
      dataIndex: 'cover_url',
      key: 'cover_url',
      render: (img: string) => <div>
        <Image
          width={100}
          src={img}
        />
      </div>
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => 
        <Button onClick={() => openRecord(record)}>
          <UnorderedListOutlined />
        </Button>
      
    }
  ]

  const searchingBook = (e: string) => {
    setSearch(e);
  };

  const openRecord = (rec: any) => {
    setDetail(
      rec
    );
    setOpen(true);
  }

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

  const onCloseModal = () => {
    setOpen(false);
    setDetail({});
  };

  const onChangePage = (currentp: number, sizep: number) => {
    dispatch(getBooks({
      catId: idCat,
      page: currentp,
      size: sizep
    }))
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
      <Layout>
        <ReactModal
          isOpen={open}
          contentLabel={"Book Detail"}
          ariaHideApp={false}
        >
          <div style={{padding: 15}}>
            <Button onClick={() => onCloseModal()} type="text" style={{float: 'right'}}>X</Button>
            <Title level={3}>
              {detail?.title}
            </Title>
            <Divider/>
            <Row gutter={[16,16]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Image
                  width={'50%'}
                  src={detail?.cover_url}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Paragraph style={{fontWeight: 'bold'}}>
                  Authors :
                </Paragraph>
                {
                  detail?.authors &&
                  detail?.authors.map((item: string, i: number) => (
                    <Paragraph key={i} style={{paddingLeft: 10}}>
                      {item}
                    </Paragraph>
                  ))
                }
                <Paragraph style={{fontWeight: 'bold'}}>
                  Description :
                </Paragraph>
                <Paragraph style={{paddingLeft: 10}}>
                  {detail?.description}
                </Paragraph>
                <Paragraph style={{fontWeight: 'bold'}}>
                  Sections :
                </Paragraph>
                {
                  detail?.sections &&
                  detail?.sections.map((item: any, i: number) => (
                    <div key={i}>
                      <Paragraph style={{paddingLeft: 10}}>
                        {`Title: ${item?.title}`}
                      </Paragraph>
                      <Paragraph style={{paddingLeft: 10}}>
                        {`Content: ${item?.content}`}
                      </Paragraph>
                      <Divider/>
                    </div>
                  ))
                }
                
              </Col>
            </Row>
          </div>
        </ReactModal>
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
                pagination={{
                  total: 50,
                  defaultPageSize: size,
                  defaultCurrent: page,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30'],
                  onShowSizeChange: onChangePage,
                }}              
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
