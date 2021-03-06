import React, { PureComponent } from 'react';
import { Form, Input, Table, Tag, Descriptions, Badge, Card, Button } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';

const { Column, ColumnGroup } = Table;
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: '任务进行的阶段',
    key: 'stage',
    dataIndex: 'stage',
    render: stage => (
      <span>
        {stage.map(tag => {
          return (
            <Tag color="geekblue" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '收取的比例',
    dataIndex: 'receivable',
    key: 'receivable',
  },
];

const data = [
  {
    key: '1',
    ID: '1',
    receivable: '0.1',
    stage: ['1', '2'],
  },
  {
    key: '2',
    ID: '2',
    receivable: '0.5',
    stage: ['3'],
  },
  {
    key: '3',
    ID: '3',
    receivable: '0.8',
    stage: ['4', '5', '6', '7', '8'],
  },
];
@connect(({ operator, loading }) => ({
  operator,
  loading: loading.effects['operator/fetchOperator'],
  //model
}))
@Form.create()
class ShangJia extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    // const { dispatch } = this.props;

    dispatch({
      type: 'operator/fetchOperator',
      payload: params.id || '5e6465051c4635383c381f5e',
    });

    // console.log('this.props.data',this.props.data);
  }

  onOperatorState(operatorState) {
    if (operatorState == '1') {
      return <Badge status="success" text="已上架" />;
    } else {
      return <Badge status="error" text="未上架" />;
    }
  }

  render() {
    const {
      operator = {},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    // console.log('operator.date',operator);
    return (
      // 加头部
      <PageHeaderWrapper title={<FormattedMessage id="app.categoty.basic.title" />}>
        <Card bordered={false}>
          <Descriptions title="服务品类包上架" bordered loading={loading}>
            <Descriptions.Item label="品类包ID">{operator.data._id}</Descriptions.Item>
            <Descriptions.Item label="品类包名">{operator.data.operatorName}</Descriptions.Item>
            <Descriptions.Item label="品类包标签">设计类</Descriptions.Item>
            <Descriptions.Item label="品类包上架时间">
              {operator.data.operatorAddTime}
            </Descriptions.Item>
            <Descriptions.Item label="运营商ID" span={2}>
              {operator.data._id}
            </Descriptions.Item>
            <Descriptions.Item label="品类包介绍" span={3}>
              {operator.data.content}
            </Descriptions.Item>
            <Descriptions.Item label="品类包状态" span={3}>
              {this.onOperatorState(operator.data.operatorState)}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <Descriptions title="品类规范（用于品类下级单品规范）" bordered loading={loading}>
            <Descriptions.Item label="规范必要说明" span={3}>
              {operator.data.content}
            </Descriptions.Item>
            <Descriptions.Item label="名称最小字数">1</Descriptions.Item>
            <Descriptions.Item label="简介最大字数">1</Descriptions.Item>
            <Descriptions.Item label="详情最大字数">1</Descriptions.Item>
            <Descriptions.Item label="名称最大字数">1</Descriptions.Item>
            <Descriptions.Item label="简介最小字数">1</Descriptions.Item>
            <Descriptions.Item label="详情最小字数">1</Descriptions.Item>
            <Descriptions.Item label="最大分区数">1</Descriptions.Item>
            <Descriptions.Item label="最少任务数">1</Descriptions.Item>
            <Descriptions.Item label="最小评分">1</Descriptions.Item>
            <Descriptions.Item label="最小分区数">1</Descriptions.Item>
            <Descriptions.Item label="最大任务数">1</Descriptions.Item>
            <Descriptions.Item label="任务最长时间">1</Descriptions.Item>
            <Descriptions.Item label="单个分区最低价格">1</Descriptions.Item>
            <Descriptions.Item label="单个分区最高价格" span={2}>
              1
            </Descriptions.Item>
            <Descriptions.Item label="任务中断要求" span={3}>
              <Table className="Table1" columns={columns} dataSource={data} />
            </Descriptions.Item>
          </Descriptions>
          <Card bordered={false}>
            <Form.Item label="上架理由">
              {getFieldDecorator('reason', {
                rules: [{ required: true, message: '请输入上架理由' }],
              })(
                <Input.TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入上架理由"
                  rows={3}
                />
              )}
            </Form.Item>
          </Card>
          <Card bordered={false}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                this.props.history.push('/category/list');
              }}
              className={styles.ButtonCenter}
            >
              发送上架申请
            </Button>
          </Card>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ShangJia;
