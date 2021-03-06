import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Rate from './index';
import Space from '../Space';
import Icon from '../components/icon';
import { Input as InputA } from 'antd';
const { TextArea } = InputA;

class Page extends React.Component {

    state={
        loading:false
    }

    render() {

        const { loading }=this.state;


        return (
            <Layout >
                <Title>Rate评分</Title>
                <Description>通过鼠标或键盘输入内容，是最基础的表单域的包装。</Description>
                <SubTitle>何时使用</SubTitle>
                <Description>需要用户输入表单域内容时。提供组合型输入框，带搜索的输入框，还可以进行大小选择。</Description>
                <SubTitle>代码演示</SubTitle>

                <TextLayout
                    components={<React.Fragment>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                           
                            <Rate  />

                        </div>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"有border与不border2种形式"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Space size="large" direction="vertical" isBlock>



                        </Space>

                    </React.Fragment>}
                    title={"三种大小。"}
                    description={"我们为 <Input /> 输入框定义了三种尺寸（大、默认、小），高度分别为 40px、32px 和 24px。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Space size="large" direction="vertical" isBlock >

                        </Space>

                    </React.Fragment>}
                    title={"搜索框。"}
                    description={"带有搜索按钮的输入框。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Space size="large" direction="vertical" isBlock>



                        </Space>

                    </React.Fragment>}
                    title={"搜索框。"}
                    description={"带有清除标记。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Space size="large" direction="vertical" isBlock>



                        </Space>

                    </React.Fragment>}
                    title={"前缀和后缀"}
                    description={"在输入框上添加前缀或后缀图标。"}
                ></TextLayout>



                <TextLayout
                    components={<React.Fragment>
                        <Space size="large" direction="vertical" isBlock>


                        </Space>

                    </React.Fragment>}
                    title={"密码框"}
                    description={"在输入框上添加前缀或后缀图标。"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Space size="large" direction="vertical" isBlock>

                        </Space>

                    </React.Fragment>}
                    title={"前缀和后缀"}
                    description={"在输入框上添加前缀或后缀图标。"}
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
                        { attr: "disabled", description: "按钮失效状态", type: "boolean", default: "false" },
                        { attr: "type", description: "设置按钮类型，可选值为 primary dashed danger link或者不设", type: "string", default: "-" },
                        { attr: "size", description: "设置按钮大小，可选值为 small large 或者不设", type: "string", default: "default" },
                        { attr: "shape", description: "设置按钮形状，可选值为 circle 或者不设", type: "string", default: "-" },
                        { attr: "float", description: "设置按钮是否悬浮", type: "boolean", default: "false" },
                        { attr: "flat", description: "设置按钮的扁平状态", type: "boolean", default: "false" },
                    ]}
                />

            </Layout >
        )
    }
}

export default Page;