import React, { useState, useEffect } from "react";
import { Form, Radio } from "semantic-ui-react";

const Settings = (props) => {
    const [theme, setTheme] = useState(sessionStorage.getItem('theme'))

    const colorTheme = () => {
        if (theme === 'blue') {
            document.documentElement.style.setProperty('--main-bg-color', '#92dce5');
            document.documentElement.style.setProperty('--main-window-color', '#f2f2f2');
            document.documentElement.style.setProperty('--main-accent-color', '#ff695e');
            document.documentElement.style.setProperty('--nav-color', '#3F3D56');
            document.documentElement.style.setProperty('--white', '#f2f2f2');
        }
        //#DB5878 <to do column?
        //#ff695e <accent color for inverted red (progress bar)
        if (theme === 'purple') {
            document.documentElement.style.setProperty('--main-bg-color', '#42008d');
            document.documentElement.style.setProperty('--main-window-color', '#5802bb');
            document.documentElement.style.setProperty('--main-accent-color', '#ff7948');
            document.documentElement.style.setProperty('--nav-color', 'linear-gradient(360deg, var(--main-window-color) 30%, var(--main-accent-color) 100%)');
            document.documentElement.style.setProperty('--white', '#ffffff');
        }
        if (theme === 'teal') {
            document.documentElement.style.setProperty('--main-bg-color', '#0D4145');
            document.documentElement.style.setProperty('--main-window-color', '#1b978f');
            document.documentElement.style.setProperty('--main-accent-color', '#ddfff7');
            document.documentElement.style.setProperty('--nav-color', '#1b978f');
            document.documentElement.style.setProperty('--white', '#f2f2f2');
        }
    }

    const handleThemeChange = () => {

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