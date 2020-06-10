import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Popover from './index';
import Button from '../ButtonBase';
 
const Page=()=>{
 
     

        return (
            <Layout >
                <Title>Popover</Title>
                
                <SubTitle>何时使用</SubTitle>

                <SubTitle>代码演示</SubTitle>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>

                        <Popover
                            title="prompt title"
                            content={<div>
                                <p>Content</p>
                                <p>Content</p>
                            </div>} >
                            <span>Tooltip will show on mouse enter.</span>
                        </Popover>

                    </React.Fragment>}
                    title={"基本用法"}
                    description={"一个简单的 loading 状态。"}
                ></TextLayout>

                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Popover
                         
                            content={<div>
                                <div>Content</div>
                            </div>} >
                            <Button type="primary" >Primary</Button>  
                        </Popover>

                    </React.Fragment>}
                    title={"基本用法"}
                    description={"一个简单的 loading 状态。"}
                ></TextLayout>




                <SubTitle>API</SubTitle>
                <Description>通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled。</Description>
                <Description>按钮的属性说明如下：</Description>
                <DescriptionTable
                    columns={[
                        { title: "属性", dataIndex: "attr" },
                        { title: "说明", dataIndex: "description" },
                        { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                        { title: "默认值", dataIndex: "default" }
                    ]}
                    dataSource={[
                        { attr: "children", description: "需要挂载的元素", type: "node/string", default: "false" },
                        
                        { attr: "prefixCls", description: "自定义类名前缀", type: "string", default: "" },
                        { attr: "className", description: "额外添加的类名", type: "string", default: "false" },
                    ]}
                />

            </Layout>
        )
   
}

export default Page;