import React from "react";

export const parameters = {
    // docs: {
    //     source: {
    //         state: 'open',
    //     },
    // },
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },

}
