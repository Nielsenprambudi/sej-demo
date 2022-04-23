import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCategories, getBooks, searchBooks, addBookmarks ,clearBooks} from '../storing/actions/category';
import {Layout, Typography, Row, Col, 
  Input, Select, Table, Divider,
  Image, Button, Tooltip, Card, Pagination,
  Empty
} from 'antd';
import ReactModal from 'react-modal';
import { UnorderedListOutlined, BookOutlined } from '@ant-design/icons'; 
import { useMediaQuery } from 'react-responsive';
const {Content} = Layout;
const {Title, Paragraph} = Typography;
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
  const mobileVersion = useMediaQuery({ maxWidth: 767})
  const {isLoadingCat, isCat, 
    cats, isLoadingBook, books,
    size, page
  } = useSelector((state: any) => state.config);
  const [selectCat, setSelectCat] = useState(null);
  const [idCat, setIdCat] = useState('');
  const [detail, setDetail] = useState({} as detailbook);
  const [open, setOpen] = useState(false);
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <div>{id + 1}</div>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: (title: string) => (
        <Tooltip placement='topLeft' title={title}>
          {title}
        </Tooltip>
      )
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
      render: (authors: any) => (
          authors.map((item: string, i: number) => (
            <Paragraph key={i}>{item}</Paragraph>
          ))
      )
    },
    {
      title: 'Covers',
      dataIndex: 'cover_url',
      key: 'cover_url',
      render: (img: string) => <div>
        <Image
          width={50}
          src={img}
        />
      </div>
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => 
        <Row>
          <Col>
            <Tooltip placement='topLeft' title="Book Detail">
              <Button onClick={() => openRecord(record)}>
                <UnorderedListOutlined />
              </Button>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip placement='topLeft' title="Bookmark">
              <Button onClick={() => addingBook(record)}>
                <BookOutlined />
              </Button>
            </Tooltip>
          </Col>
          
        </Row>
      
    }
  ]

  const addingBook = (book: any) => {
    dispatch(addBookmarks(book));
    alert("Successfully adding book inside bookmarks")
  }

  const searchingBook = (e: string) => {
    setSearch(e);
    if(e === '') {
      if(idCat === '') {
        alert('Please Choose Category First!')
      } else {
        dispatch(getBooks({
          catId: idCat,
          page: 0,
          size: 10
        }))
      }
    }
    dispatch(searchBooks(e));
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

  const onChangeSizePage = (currentp: number, sizep: number) => {
    if(idCat === "") {
      alert("Please select category first!");
    } else {
      dispatch(getBooks({
        catId: idCat,
        page: currentp,
        size: sizep
      }));
    }
  }

  const pageChange = (page: number, size: number) => {
    if(idCat === "") {
      alert("Please select category first!")
    } else {
      dispatch(getBooks({
        catId: idCat,
        page: page - 1,
        size: size
      }))
    }
  }



  useEffect(() => {
    dispatch(clearBooks());
    setIdCat('');
    setSelectCat(null);
    dispatch(getCategories());
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
        <Layout className='layoutwrapper'>
          <Content>
            <div className='layoutcontent'>
              <Row gutter={[16,16]}>
                <Col className='gutter-row' xs={24} sm={24} md={12} lg={12}>
                  <Select value={selectCat} style={{width: '100%'}} onChange={onChangeCat}  placeholder="Select category first to get list of books" loading={isLoadingCat}>
                    {
                      isCat &&
                      cats.map((item: any, i: number) => (
                        <Option value={JSON.stringify(item)}>{item?.name}</Option>
                      ))
                    }
                  </Select>
                </Col>
                <Col className='gutter-row' xs={24} sm={24} md={12} lg={12}>
                  <Search placeholder="searching book author or title" onSearch={(e) => searchingBook(e)} style={{ width: '100%' }} />
                </Col>
                
              </Row>
              <Divider/>
              {
                !mobileVersion ?
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
                    onShowSizeChange: onChangeSizePage,
                    onChange: pageChange,
                  }}              
                /> :
                (
                  <div>
                    {
                      books.length > 0 ?
                      books.map((b: any, y: number) => (
                        <div key={y}>
                          <Card 
                            title={b.title}
                            actions={[
                              <Tooltip placement='topLeft' title="Book Detail">
                                <Button onClick={() => openRecord(b)}>
                                  <UnorderedListOutlined /> Detail
                                </Button>
                              </Tooltip>,
                              <Tooltip placement='topLeft' title="Bookmark">
                                <Button onClick={() => addingBook(b)}>
                                  <BookOutlined /> Bookmark
                                </Button>
                              </Tooltip>
                            ]}
                            cover={<Image
                              style={{padding: 15}}
                              width={'100%'}
                              src={b.cover_url}
                            />}
                          >
                            <Title level={5} style={{fontWeight: 'bold'}}>Authors :</Title>
                            {
                              b.authors.map((booka: string, x: number) => (
                                <Paragraph key={x}>
                                  {booka}
                                </Paragraph>
                              ))
                            }
                          </Card>
                        </div>
                      )) :
                      <Empty/>
                    }
                    {
                      books.length > 0 &&
                      <Pagination
                        total={50}
                        defaultPageSize={size}
                        defaultCurrent={page}
                        showSizeChanger={true}
                        pageSizeOptions={['10', '20', '30']}
                        onShowSizeChange={onChangeSizePage}
                        onChange={pageChange}
                      />
                    }
                  </div>
                )
              }
            </div>
          </Content>
        </Layout>
      </Layout>
  );
}

export default Demo;
