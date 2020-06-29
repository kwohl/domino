import React, { useState, useEffect } from "react";
import { Form, Radio, Header, Icon } from "semantic-ui-react";

const Settings = (props) => {
    const [theme, setTheme] = useState(sessionStorage.getItem('theme'))

    const colorTheme = () => {
        if (theme === 'blue') {
            document.documentElement.style.setProperty('--main-bg-color', '#92dce5');
            document.documentElement.style.setProperty('--main-window-color', '#f2f2f2');
            document.documentElement.style.setProperty('--main-accent-color', '#ff695e');
            document.documentElement.style.setProperty('--nav-color', '#3F3D56');
            document.documentElement.style.setProperty('--white', '#ffffff');
        }
        //#DB5878 <to do column?
        //#ff7948 <pretty orange
        //#5802bb <original pretty purple
        if (theme === 'purple') {
            document.documentElement.style.setProperty('--main-bg-color', '#42008d');
            document.documentElement.style.setProperty('--main-window-color', '#f2f2f2');
            document.documentElement.style.setProperty('--main-accent-color', '#ff695e');
            document.documentElement.style.setProperty('--nav-color', 'linear-gradient(360deg, #5802bb 30%, var(--main-accent-color) 100%)');
            document.documentElement.style.setProperty('--white', '#ffffff');
        }
        if (theme === 'teal') {
            document.documentElement.style.setProperty('--main-bg-color', '#119da4');
            document.documentElement.style.setProperty('--main-window-color', '#f2f2f2');
            document.documentElement.style.setProperty('--main-accent-color', '#ff695e');
            document.documentElement.style.setProperty('--nav-color', '#114b5f');
            document.documentElement.style.setProperty('--white', '#ffffff');
        }
    }

    useEffect(() => {
        colorTheme()
      }, [theme])
    
    return (
        <div className="pageContent">
            <div className="task-form">
            <Form>
            <div className="center">
                <Header as='h2' icon>
                    <Icon name='settings' />
                    Account Settings
                    <Header.Subheader>
                    Please Select a Theme
                    </Header.Subheader>
                </Header>
            </div>
                <Form.Field>
                    <Radio
                        label='Blue'
                        name='radioGroup'
                        value='blue'
                        checked={theme === 'blue'}
                        onClick={() => setTheme('blue')}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Purple'
                        name='radioGroup'
                        value='purple'
                        checked={theme === 'purple'}
                        onClick={() => setTheme('purple')}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Teal'
                        name='radioGroup'
                        value='teal'
                        checked={theme === 'teal'}
                        onClick={() => setTheme('teal')}
                    />
                </Form.Field>
            </Form>
            </div>
        </div>
    )
}

export default Settings;