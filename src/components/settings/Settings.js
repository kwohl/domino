import React, { useState, useEffect } from "react";
import { Form, Radio } from "semantic-ui-react";

const Settings = (props) => {
    const [theme, setTheme] = useState("")

    const colorTheme = () => {
        if (theme === 'blue') {
            document.documentElement.style.setProperty('--main-bg-color', '#92dce5');
            document.documentElement.style.setProperty('--main-window-color', '#b95f89');
            document.documentElement.style.setProperty('--main-accent-color', '#2b303a');
            document.documentElement.style.setProperty('--nav-color', '#3F3D56');
            document.documentElement.style.setProperty('--white', '#eee5e9');
        }
        if (theme === 'purple') {
            document.documentElement.style.setProperty('--main-bg-color', '#42008d');
            document.documentElement.style.setProperty('--main-window-color', '#5802bb');
            document.documentElement.style.setProperty('--main-accent-color', '#ff7948');
            document.documentElement.style.setProperty('--nav-color', '#42008d');
            document.documentElement.style.setProperty('--white', '#ffffff');
        }
        if (theme === 'spring') {
            document.documentElement.style.setProperty('--main-bg-color', '#0D4145');
            document.documentElement.style.setProperty('--main-window-color', '#1b978f');
            document.documentElement.style.setProperty('--main-accent-color', '#f79892');
            document.documentElement.style.setProperty('--nav-color', '#0D4145');
            document.documentElement.style.setProperty('--white', '#ffffff');
        }
        console.log(theme)
    }

    useEffect(() => {
        colorTheme()
      }, [theme])
    
    return (
        <div className="pageContent">
            <div className="task-form">
            <Form>
                Please select a theme
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
                        label='Spring'
                        name='radioGroup'
                        value='spring'
                        checked={theme === 'spring'}
                        onClick={() => setTheme('spring')}
                    />
                </Form.Field>
            </Form>
            </div>
        </div>
    )
}

export default Settings;