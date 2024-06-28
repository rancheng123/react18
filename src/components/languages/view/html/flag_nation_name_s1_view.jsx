
import React from 'react';

function s1() {
    const {
            state: {
                component: {
                    id,
                    components
                },
                data: {
                    document_data = {},
                    theme_data = {}
                }
            },
            props: {
                context,
                clone
            }
        } = this
    return (
        <div id={id}>
            1111122222
        </div>
    )
}

export { s1 }