import React from 'react';


const RenderHTML: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};

export default RenderHTML;