import { Divider, Select, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default function EditPage({pageList}){
    console.log(pageList);
    
    const addItem = () => {
        
    }
    const options = [
        {
          label: 'China',
          value: 'china',
          emoji: '🇨🇳',
          desc: 'China (中国)',
        },
        {
          label: 'USA',
          value: 'usa',
          emoji: '🇺🇸',
          desc: 'USA (美国)',
        },
        {
          label: 'Japan',
          value: 'japan',
          emoji: '🇯🇵',
          desc: 'Japan (日本)',
        },
        {
          label: 'Korea',
          value: 'korea',
          emoji: '🇰🇷',
          desc: 'Korea (韩国)',
        },
      ];
    return (
        <Select
            style={{ width: '190px' }}
            placeholder="当前页面:"
            // dropdownRender={(menu) => (
            //     <>
            //     {menu}
            //     <Divider style={{ margin: '8px 0' }} />
            //     <Space style={{ padding: '0 8px 4px' }}>
            //         <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
            //             新增空白页
            //         </Button>
            //     </Space>
            //     </>
            // )}
            options={options}
            optionRender={(option)=>{
                <Space>
                    {option.data.desc}
                </Space>
            }}
        />
    )
}