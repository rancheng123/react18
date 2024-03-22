import { useState, useEffect } from 'react';
import { Divider, Select, Input,Button,Form ,Modal} from 'antd';
const { TextArea } = Input;
import { PlusOutlined } from '@ant-design/icons';
import styles from './header.module.less'


export default function EditPage({pageList}){

    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
      console.log('Received values of form: ', values);
      setFormValues(values);
      setOpen(false);
    };

    const addItem = () => {
        console.log('addItem');
    }

    // 编辑
    const handEdit = (event,value)=>{
      event.stopPropagation()
      setOpen(true);
    }
    // 复制
    const handCopy = (event)=>{
      event.stopPropagation()
    }
    // 删除
    const handDel = (event)=>{
      event.stopPropagation()
    }

    // 下拉框发生改变
    const handleSelect = (value) => {
        console.log(`selected ${value}`);
    }

    const options =  [
      { "value": 1, "label": "产品列表页" },
      { "value": 2, "label": "产品详情页" },
      { "value": 3, "label": "案例列表页" },
      { "value": 4, "label": "案例详情页" },
      { "value": 5, "label": "新闻列表页" },
      { "value": 6, "label": "新闻详情页" },
      { "value": 7, "label": "下载列表页" },
      { "value": 8, "label": "FAQ列表页" },
      { "value": 9, "label": "证书列表页" },
      { "value": 10, "label": "视频列表页" },
      { "value": 11, "label": "单页" },
      { "value": 12, "label": "空白页", "type": "add" }
  ];
    return (
      <>
        <Select
            popupClassName={styles.EditPageSelect}
            style={{ width: '190px' }}
            listHeight={400}
            defaultValue={[1]}
            onSelect={handleSelect}
            optionLabelProp="label"
            dropdownRender={(menu) => (
                <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <div className={styles.addItem} onClick={addItem}>
                    <PlusOutlined />
                    新增空白页
                </div>
                </>
            )}
            options={options}
            optionRender={(option)=>{
                return (
                  <div className={styles.edit_page_option}>
                    <div className={styles.edit_page_option_label}>
                      {option.data.label}
                    </div>
                    { option.data.type == 'add' &&
                      (
                        <div className={styles.edit_page_option_emoji}>
                          <i className="iconfont" title='编辑' onClick={(e)=>handEdit(e,option.data.value)}>&#xe7a6;</i>
                          <i className="iconfont" title='复制'  onClick={(e)=>handCopy(e,option.data.value)}>&#xe79b;</i>
                          <i className="iconfont" title='删除'  onClick={(e)=>handDel(e,option.data.value)}>&#xe797;</i>
                        </div>
                      ) 
                    }
                    
                  </div>
                )
            }}
        />
        <CollectionCreateFormModal
          open={open}
          onCreate={onCreate}
          onCancel={() => setOpen(false)}
          initialValues={{
            title: 'public',
            id: '1',
          }}
        />
      </>
        
    )
}

const CollectionCreateFormModal = ({ open, onCreate, onCancel, initialValues }) => {
  const [formInstance, setFormInstance] = useState();
  return (
    <Modal
      open={open}
      title="页面设置"
      okText="确认"
      cancelText="取消"
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      footer={[
        <Button key="ok" type='primary' onClick={async () => {
          try {
            // 表单验证
            const values = await formInstance?.validateFields();
            formInstance?.resetFields();
            onCreate(values);
          } catch (error) {
            console.log('Failed:', error);
          }
        }}>确定</Button>
      ]}
      destroyOnClose
    >
      <CollectionCreateForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

const CollectionCreateForm = ({ initialValues, onFormInstanceReady }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form layout="horizontal " form={form} name="form_in_modal" initialValues={initialValues} labelCol={{span: 4, offset:0}}>
      <Form.Item
        name="title"
        label="页面名称"
        rules={[
          {
            required: true,
            message: '请输入页面名称',
          },
        ]}
      >
        <Input        
        showCount 
        maxLength={200} />
      </Form.Item>
      <Form.Item
        name="url"
        label="URL"
        rules={[
          {
            required: true,
            message: '请输入只包含英文字母、数字、“-”的组合',
          },
        ]} 
      >
        <Input showCount 
        maxLength={200}/>
      </Form.Item>
      <Form.Item
        name="seoTitle"
        label="SEO标题"
      >
        <Input        
          showCount 
          maxLength={110} />
      </Form.Item>
      <Form.Item name="description" label="SEO描述">
        <TextArea
          rows={4}
          showCount 
          maxLength={400}
        />
      </Form.Item>
    </Form>
  );
};