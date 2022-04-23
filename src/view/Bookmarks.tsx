import {useState} from 'react';
import { useSelector } from 'react-redux';
import {Layout, Typography, Row, Col, 
  Input, Select, Table, Divider,
  Image, Button, Tooltip, Card,
  Empty
} from 'antd';
import ReactModal from 'react-modal';
import { UnorderedListOutlined } from '@ant-design/icons'; 
import { useMediaQuery } from 'react-responsive';
const {Content} = Layout;
const {Title, Paragraph} = Typography;

type detailbook = {
  title?: string,
  authors?: any,
  cover_url?: string,
  description?: string,
  sections?: any
}

const Bookmarks = () => {
  const mobileVersion = useMediaQuery({ maxWidth: 767})
  const {bookmarkAdd
  } = useSelector((state: any) => state.config);
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
        <Tooltip placement='topLeft' title={"Book Detail"}>
          <Button onClick={() => openRecord(record)}>
            <UnorderedListOutlined />
          </Button>
        </Tooltip>
      
    }
  ]

  

  const openRecord = (rec: any) => {
    setDetail(
      rec
    );
    setOpen(true);
  }

  
  const onCloseModal = () => {
    setOpen(false);
    setDetail({});
  };

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
              {
                !mobileVersion ?
                <Table
                  columns={columns}
                  dataSource={bookmarkAdd}           
                /> :
                (
                  <div>
                    {
                      bookmarkAdd.length > 0 ?
                      bookmarkAdd.map((b: any, y: number) => (
                        <div key={y}>
                          <Card 
                            title={b.title}
                            actions={[
                              <Tooltip placement='topLeft' title="Book Detail">
                                <Button onClick={() => openRecord(b)}>
                                  <UnorderedListOutlined /> Detail
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
                  </div>
                )
              }
            </div>
          </Content>
        </Layout>
      </Layout>
  );
}

export default Bookmarks;
