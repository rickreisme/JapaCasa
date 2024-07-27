import type { Preview } from "@storybook/react";
import {Decorator} from "@storybook/react"
import '../src/assets/styles/global.scss'
import '../src/assets/styles/menu.scss'


const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
